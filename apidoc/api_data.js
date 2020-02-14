define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/login",
    "title": "Login to API",
    "version": "0.0.1",
    "name": "Login",
    "group": "api",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "un",
            "description": "<p>User's username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pw",
            "description": "<p>User's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "token",
            "description": "<p>Object with single key, 'token', which contains the Bearer token which must be sent to protected routes.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Returns 401 status on bad authentication request.</p>"
          }
        ]
      }
    },
    "filename": "src/routes.ts",
    "groupTitle": "api"
  }
] });
