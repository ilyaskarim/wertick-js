/*
    This is all where GraphQL thing happens. This file loads all graphql schemas from the app.
*/

const { get, isFunction } = require("lodash");
import generalSchema from "./generalSchema";
import {
  generateSubscriptionsCrudResolvers,
  generateQueriesCrudSchema,
  generateListTypeForModule,
  generateMutationsCrudSubscriptionSchema,
  generateMutationsCrudSchema,
  generateCrudResolvers,
} from "./crudGenerator";
let { PubSub } = require("apollo-server");
import { IConfiguration } from "../types/configuration";
import { GraphQLModuleRelationMapper } from "../moduleRelationships/graphql";
const pubsub = new PubSub();

export default async function (configuration: IConfiguration) {
  let modulesSchema = ``;
  let modulesQuerySchema = ``;
  let modulesMutationSchema = ``;
  let modulesSubscriptionSchema = ``;
  let modules = process.env.builtinModules.split(",");
  modules = modules.filter((c) => c);
  modules = [...modules, ...get(configuration, "modules", [])];
  let response = () => {
    return {
      message: require("../../../package.json").welcomeResponse,
      version: require("../../../package.json").version,
    };
  };
  let schemaMap = require("./schemaMap").default;

  let appMutations = {};
  let appQueries = {};
  let appSubscriptions = {};
  let appCustomResolvers = {};

  const processModule = function (module) {
    if (module && module.hasOwnProperty("graphql")) {
      let graphql = module.graphql;
      const useDatabase = get(module, "useDatabase", true);
      let moduleName = module.name;
      let schema = graphql.schema;
      let currentGenerateQuery = get(graphql, "crud.query.generate", true);
      let currentGenerateQueryOperations = get(graphql, "crud.query.operations", "*");
      let currentGenerateMutation = get(graphql, "crud.mutation.generate", true);
      let currentGenerateMutationOperations = get(graphql, "crud.mutation.operations", "*");
      let currentMutationSchema = get(graphql, "mutation.schema", "");
      let currentMutationResolvers = get(graphql, "mutation.resolvers", {});
      let currentQuerySchema = get(graphql, "query.schema", "");
      let currentQueryResolvers = get(graphql, "query.resolvers", {});
      let currentModuleCrudResolvers = generateCrudResolvers(
        module,
        pubsub,
        currentGenerateMutationOperations,
        currentGenerateQueryOperations,
        configuration
      );
      let currentModuleSubscriptionResolvers = {};
      let currentModuleListSchema = currentGenerateQuery || currentGenerateMutation ? generateListTypeForModule(module) : "";
      if (useDatabase === true) {
        currentModuleSubscriptionResolvers = generateSubscriptionsCrudResolvers(moduleName, pubsub, currentGenerateMutationOperations);
      }
      // relations
      let customResolvers = get(graphql, "customResolvers", {});
      
      appCustomResolvers[module.name] = {
        ...customResolvers,
        ...GraphQLModuleRelationMapper(module),
      };

      // Issue: https://github.com/Uconnect-Technologies/wertik-js/issues/215
      const totalResolvers = Object.keys(appCustomResolvers[module.name]).length
      if (totalResolvers === 0) {
        delete appCustomResolvers[module.name]
      }
      // relations
      // require information
      // crud
      if (currentGenerateQuery) {
        modulesQuerySchema = modulesQuerySchema + generateQueriesCrudSchema(moduleName, currentGenerateQueryOperations);
        appQueries = { ...appQueries, ...currentModuleCrudResolvers.queries };
      }
      if (currentGenerateMutation) {
        modulesMutationSchema = modulesMutationSchema + generateMutationsCrudSchema(moduleName, currentGenerateMutationOperations);
        appMutations = { ...appMutations, ...currentModuleCrudResolvers.mutations };
      }
      // crud
      // Subscription

      let currentModuleCrudSubscription = currentGenerateMutation
        ? generateMutationsCrudSubscriptionSchema(moduleName, currentGenerateMutationOperations, currentGenerateQueryOperations)
        : "";

      // Subscription
      modulesSchema = modulesSchema + schema;
      modulesSchema = modulesSchema + currentModuleListSchema;
      modulesQuerySchema = modulesQuerySchema + currentQuerySchema;
      modulesMutationSchema = modulesMutationSchema + currentMutationSchema;
      modulesSubscriptionSchema = modulesSubscriptionSchema + currentModuleCrudSubscription;
      appQueries = { ...appQueries, ...currentQueryResolvers };
      appMutations = { ...appMutations, ...currentMutationResolvers };
      if (currentGenerateMutation) {
        appSubscriptions = { ...appSubscriptions, ...currentModuleSubscriptionResolvers };
      }
    }
  };

  modules.forEach(async (element: any) => {
    let module;
    if (element.constructor === String) {
      module = require(`./../builtinModules/${element}/index`).default;
    } else if (element.constructor === Object || isFunction(element)) {
      if (element.constructor == Function) {
        module = await element(configuration);
      } else {
        module = element;
      }
    }
    processModule(module);
  });

  schemaMap = schemaMap.replace("[generalSchema__replace]", generalSchema);
  schemaMap = schemaMap.replace("[modulesSchema__replace]", modulesSchema);
  schemaMap = schemaMap.replace("[mutation__replace]", modulesMutationSchema);
  schemaMap = schemaMap.replace("[query__replace]", modulesQuerySchema);
  schemaMap = schemaMap.replace("[subscription__replace]", modulesSubscriptionSchema);

  return {
    schema: schemaMap,
    resolvers: {
      Mutation: {
        ...appMutations,
        response: response,
      },
      Query: {
        ...appQueries,
        response: response,
      },
      Subscription: {
        ...appSubscriptions,
      },
      ...appCustomResolvers,
    },
  };
}
