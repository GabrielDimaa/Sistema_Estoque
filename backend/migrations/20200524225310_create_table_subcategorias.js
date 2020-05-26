
exports.up = function(knex) {
    return knex.schema.createTable('subcategorias', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('id_pai').references('id').inTable('subcategorias')
        table.integer('categoria_id').references('id').inTable('categorias').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('subcategorias')
};
