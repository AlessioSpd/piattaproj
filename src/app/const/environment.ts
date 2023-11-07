export const environment = {
    production: false,
    serverUrl: '',
    keycloak: {
      // Url of the Identity Provider
      issuer: 'http://localhost:8080',
      // Realm
      realm: 'techStore',
      clientId: 'angular-client',
    },
  };