// Update with your config settings.

module.exports = {

  production: {
    client: 'postgresql',
    connection: {
      database: 'dd9bnae9j8734d',
      user:     'hzhzhysgpursgg',
      password: 'Mkih7oW9Ek6dGdTSmyuVgxw3kr'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'groupdb'
    }
  }

}
