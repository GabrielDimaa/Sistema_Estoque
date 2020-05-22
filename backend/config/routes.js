module.exports = app => {
    app.post('/login', app.api.user.save)
    app.post('/login', app.api.auth.login)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/login')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/:id')
        .get(app.api.user.getById)
}