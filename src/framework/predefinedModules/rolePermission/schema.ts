import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
const {dialect} = process.env;
let relationSchemaType = "Int";
if (dialect == "MONGO_DB") {
	relationSchemaType = "String";
}

export default `
	type RolePermission {
		_id: String
		id: Int
		permission: Permission,
		role: Role
		successMessage: String
		successMessageType: String
		statusCode: String
		statusCodeNumber: Int
		created_at: String
		updated_at: String
	}
	${getListByPaginationAndFiltersSchema("RolePermission")}
	input RolePermissionInput {
		_id: String
		id: Int
		permission: ${relationSchemaType}
		role: ${relationSchemaType}
	}
`;