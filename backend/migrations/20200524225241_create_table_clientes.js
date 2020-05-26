
exports.up = function(knex) {
    return knex.schema.createTable('clientes', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('email')
        table.string('telefone')
        table.string('endereco')
        table.string('cidade')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('clientes')
};
