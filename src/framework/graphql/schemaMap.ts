export default `
  type Response {
    message: String
    version: String
  }
  type SuccessResponse {
    message: String
  }
  input IDDeleteInput {
    id: Int
    _id: String
  }
  [generalSchema__replace]
  [modulesSchema__replace]
  type Mutation {
    response: Response 
    [mutation__replace]
  }
  type Query {
    response: Response
    [query__replace]
  }
  type Subscription {
    response: Response
    [subscription__replace]
  }
  input EmailInput {
    email: String!
  }
  input SignupInput {
    email: String!
    password: String!
    confirmPassword: String!
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
