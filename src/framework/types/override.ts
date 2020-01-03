export interface IBuiltinModuleOverride {
  graphql: {
    mutation: {
      create: Function;
      update: Function;
      delete: Function;
      bulkCreate: Function;
      bulkDelete: Function;
      bulkUpdate: Function;
    };
    query: {
      list: Function;
      view: Function;
    };
  };
  restApi: {
    create: Function;
    update: Function;
    delete: Function;
    bulkCreate: Function;
    bulkDelete: Function;
    bulkUpdate: Function;
    list: Function;
    view: Function;
  };
}

export interface IBuiltinModuleOverrideAuth {
  graphql: {
    mutation: {
      login: Function;
      signup: Function;
      twoFactorLoginValidate: Function;
      loginWithAccessToken: Function;
      activateAccount: Function;
      refreshToken: Function;
    };
  };
  restApi: {
    login: Function;
    signup: Function;
    twoFactorLoginValidate: Function;
    loginWithAccessToken: Function;
    activateAccount: Function;
    refreshToken: Function;
  };
}
export interface IBuiltinModuleOverrideForgetPassword {
  graphql: {
    mutation: {
      requestPasswordReset: Function;
      resetPassword: Function;
    };
  };
  restApi: {
    requestPasswordReset: Function;
    resetPassword: Function;
  };
}

export interface IConfigurationOverride {
  ForgetPassword: IBuiltinModuleOverrideForgetPassword;
  Role: IBuiltinModuleOverride;
  UserPermission: IBuiltinModuleOverride;
  Permission: IBuiltinModuleOverride;
  UserRole: IBuiltinModuleOverride;
  RolePermission: IBuiltinModuleOverride;
  User: IBuiltinModuleOverride;
  Auth: IBuiltinModuleOverrideAuth;
}
