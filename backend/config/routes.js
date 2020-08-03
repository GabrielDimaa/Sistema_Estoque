module.exports = app => {
    app.post('/login', app.api.auth.login)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .get(app.api.user.getById)
        .put(app.api.user.save)
        .delete(app.api.user.remove)
    
    app.route('/clientes')
        .post(app.api.clientes.save)
        .get(app.api.clientes.get)

    app.route('/clientes-total')
        .get(app.api.clientes.getTotal)

    app.route('/clientes/:id')
        .get(app.api.clientes.getById)
        .put(app.api.clientes.save)
        .delete(app.api.clientes.remove)
    
    app.route('/fornecedores')
        .post(app.api.fornecedores.save)
        .get(app.api.fornecedores.get)

    app.route('/fornecedores-total')
        .get(app.api.fornecedores.getTotal)

    app.route('/fornecedores/:id')
        .get(app.api.fornecedores.getById)
        .put(app.api.fornecedores.save)
        .delete(app.api.fornecedores.remove)

    app.route('/categorias')
        .post(app.api.categorias.save)
        .get(app.api.categorias.get)
    
    app.route('/categorias/:id')
        .get(app.api.categorias.getById)
        .put(app.api.categorias.save)
        .delete(app.api.categorias.remove)

    app.route('/subcategorias')
        .post(app.api.subcategorias.save)
        .get(app.api.subcategorias.get)

    app.route('/subcategorias/:id')
        .get(app.api.subcategorias.getById)
        .put(app.api.subcategorias.save)
        .delete(app.api.subcategorias.remove)

    app.route('/produtos')
        .post(app.api.produtos.save)
        .get(app.api.produtos.get)

    app.route('/produtos-total')
        .get(app.api.produtos.getTotal)

    app.route('/produtos/:id')
        .get(app.api.produtos.getById)
        .put(app.api.produtos.save)
        .delete(app.api.produtos.remove)
}