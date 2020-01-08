import { requestPasswordResetHandler, resetPasswordHandler } from "./handlers";

export default {
  name: "ForgetPassword",
  graphql: {
    crud: {
      query: {
        generate: false,
        operations: "*"
      },
      mutation: {
        generate: false,
        operations: "*"
      }
    },
    schema: `
      type ForgetPassword {
        id: Int
        name: String
        email: String
        user: Int
        token: String
        created_at: String
        updated_at: String
      }
      input requestPasswordResetInput {
        email: String!
      }
      input resetPasswordInput {
        token: String!
        password: String!
        confirmPassword: String!
      }
     `,
    mutation: {
      schema: `
        requestPasswordReset(input: requestPasswordResetInput): SuccessResponse
        resetPassword(input: resetPasswordInput): SuccessResponse
      `,
      resolvers: {
        requestPasswordReset: async (
          _: any,
          args: any,
          context: any,
          info: any
        ) => {
          return await requestPasswordResetHandler({
            userModel: context.models.User,
            forgetPasswordModel: context.models.ForgetPassword,
            data: args.input,
            emailTemplates: context.emailTemplates,
            sendEmail: context.sendEmail
          });
        },
        resetPassword: async (_: any, args: any, context: any, info: any) => {
          return await resetPasswordHandler({
            userModel: context.models.User,
            forgetPasswordModel: context.models.ForgetPassword,
            data: args.input
          });
        }
      }
    },
    query: {
      schema: ``,
      resolvers: {}
    }
  },
  restApi: {
    endpoints: [
      {
        path: "/request-password-reset",
        methodType: "post",
        handler: async function(req, res) {
          try {
            let response = await requestPasswordResetHandler({
              userModel: req.models.User,
              forgetPasswordModel: req.models.ForgetPassword,
              data: req.body.input,
              emailTemplates: req.emailTemplates,
              sendEmail: req.sendEmail
            });
            res.json({
              message: response
            });
          } catch (e) {
            res.json({
              success: false,
              message: e.message,
              result: {}
            });
          }
        }
      },
      {
        path: "/reset-password",
        methodType: "post",
        handler: async function(req, res) {
          try {
            let response = await resetPasswordHandler({
              userModel: req.models.User,
              forgetPasswordModel: req.models.ForgetPassword,
              data: req.body.input
            });
            res.json({
              message: response
            });
          } catch (e) {
            res.json({
              success: false,
              message: e.message,
              result: {}
            });
          }
        }
      }
    ]
  },
  database: {
    sql: {
      fields: {
        name: {
          type: "String"
        },
        email: {
          type: "String"
        },
        user: {
          type: "Integer"
        },
        expiresIn: {
          type: "String"
        },
        token: {
          type: "String"
        },
        isDeleted: {
          type: "INTEGER"
        },
        createdBy: {
          type: "INTEGER"
        }
      }
    }
  }
};
