import internalServerError from "./../../../framework/helpers/internalServerError.js";
import {models} from "./../../../framework/database/connection.js";
import Model from "./../../../framework/model/model.js";
import moment from "moment";
import {get} from "lodash";
import validations from "./validations.js";
import validate from "./../../../framework/validations/validate.js";
import statusCodes from "./../../../framework/helpers/statusCodes";
import {ApolloError} from "apollo-server";

let permissionModel = new Model({
	models: models,
	tableName: "permission"
});

export default {
  queries: {
    listPermission: async (_, args, g) => {
      try {
        let paginate = await permissionModel.paginate(args);
        return paginate;
      } catch (e) {
        return internalServerError(e);
      }
    },
    permissionView: async (_, args, g) => {
      let v = await validate(validations.permission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let permission = await permissionModel.view(args);
        if (!permission) {
          throw new ApolloError("Validation error",statusCodes.NOT_FOUND.number);
        }
        permission.statusCode = statusCodes.OK.type;
        permission.statusCodeNumber = statusCodes.OK.number;
        permission.successMessageType = "Success";
        permission.successMessage = "Permission fetched";
        return permission;

      } catch (e) {
        return internalServerError(e);
      }
    }
  },
  mutations: {
    createPermission: async (_, args, g) => {
      let v = await validate(validations.createPermission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {

        let model = await permissionModel.create({action: args.action});
        model.statusCode = statusCodes.CREATED.type;
        model.statusCodeNumber = statusCodes.CREATED.number;
        model.successMessageType = "Success";
        model.successMessage = "Permission created";
        return model;

      } catch (e) {
        return internalServerError(e);
      }
    },
    deletePermission: async (_, args, g) => {
      let v = await validate(validations.deletePermission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let fakeResponse = {};
        await permissionModel.delete(args);
        fakeResponse.statusCode = statusCodes.CREATED.type;
        fakeResponse.statusCodeNumber = statusCodes.CREATED.number;
        fakeResponse.successMessageType = "Success";
        fakeResponse.successMessage = "Permission deleted";
        return fakeResponse;
      } catch (e) {
        return internalServerError(e);
      }
    },
    updatePermission: async (_, args, g) => {
      let v = await validate(validations.updatePermission,args,{abortEarly: false});
      let {success} = v;
      if (!success) {
        throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
      }
      try {
        let update = await permissionModel.update(args);
        update.statusCode = statusCodes.OK.type;
        update.statusCodeNumber = statusCodes.OK.number;
        update.successMessageType = "Success";
        update.successMessage = "Permission updated";
        return update;
      } catch (e) {
        return internalServerError(e);
      }
    },
  },
 
}