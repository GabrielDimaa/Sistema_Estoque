
exports.up = function(knex) {
    return knex.schema.createTable('categorias', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('categorias')
};
