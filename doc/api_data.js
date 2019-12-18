define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/article/apple/11/1",
    "title": "1",
    "name": "1",
    "group": "Article",
    "description": "<p>No description provided</p>",
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Article"
  },
  {
    "type": "put",
    "url": "/api/v1/article/people/",
    "title": "Empty",
    "name": "Empty",
    "group": "Article",
    "description": "<p>No description provided</p>",
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/activate-account",
    "title": "activate-account",
    "name": "activate_account",
    "group": "Auth",
    "description": "<p>No description provided</p>",
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/login",
    "title": "login",
    "name": "login",
    "group": "Auth",
    "description": "<p>No description provided</p>",
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/login-with-access-token",
    "title": "login-with-access-token",
    "name": "login_with_access_token",
    "group": "Auth",
    "description": "<p>No description provided</p>",
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/refresh-token",
    "title": "refresh-token",
    "name": "refresh_token",
    "group": "Auth",
    "description": "<p>No description provided</p>",
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/signup",
    "title": "signup",
    "name": "signup",
    "group": "Auth",
    "description": "<p>No description provided</p>",
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/two-factor-login",
    "title": "Two factor login",
    "name": "two_factor_login",
    "group": "Auth",
    "description": "<p>A long description</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "input",
            "description": "<p>Email of the user, like: {email: EMAIL}.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/two-factor-login-validate",
    "title": "two-factor-login-validate",
    "name": "two_factor_login_validate",
    "group": "Auth",
    "description": "<p>No description provided</p>",
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  }
] });
