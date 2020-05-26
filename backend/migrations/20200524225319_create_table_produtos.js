
exports.up = function(knex) {
    return knex.schema.createTable('produtos', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('codigo').notNull()
        table.float('estoque').notNull()
        table.float('preco_custo')
        table.float('preco_venda')
        table.integer('categoria_id').references('id').inTable('categorias')
        table.integer('subcategoria_id').references('id').inTable('subcategorias')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos')
};
