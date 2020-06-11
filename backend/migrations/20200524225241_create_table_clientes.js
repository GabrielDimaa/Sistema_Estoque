
exports.up = function(knex) {
    return knex.schema.createTable('clientes', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('email')
        table.string('telefone')
        table.string('telefoneAlt')
        table.string('endereco')
        table.integer('numero')
        table.integer('cep', 8)
        table.string('cidade')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('clientes')
};
