const env = require('./.env')

module.exports = {
    client: 'mysql',
    connection: env.db,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'migrations'
    }

};