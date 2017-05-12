// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'mar8037026',
      database: 'alquimia',
      charset: 'utf8',
      dateStrings: true
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'Password123',
      database: 'actuaproducciones',
      charset: 'utf8',
      dateStrings: true
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'Password123',
      database: 'actuaproducciones',
      charset: 'utf8',
      dateStrings: true
    }
  }

};
