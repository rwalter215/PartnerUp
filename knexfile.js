var url = 'postgres://hzhzhysgpursgg:Mkih7oW9Ek6dGdTSmyuVgxw3kr@ec2-54-163-245-32.compute-1.amazonaws.com:5432/dd9bnae9j8734d'

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'ec2-54-163-245-32.compute-1.amazonaws.com',
      database: 'dd9bnae9j8734d',
      user:     'hzhzhysgpursgg',
      password: 'Mkih7oW9Ek6dGdTSmyuVgxw3kr',
      url: url
    },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'groupdb'
    // }
  }

}
