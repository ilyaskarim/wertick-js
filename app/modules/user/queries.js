import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import UserSchema from "./schema.js";
import UserController from "./controller.js";
import queryMutationArgument from "@framework/schema/queryMutationArgument.js";

export default {
	user: {
		type: UserSchema,
		args: {
			...queryMutationArgument('id','number')
		},
		async resolve(_, args) {
			return await UserController.user(_, args);
		}
	}
}