module.exports = app => {
    const { existe, igual, naoExiste } = app.api.validation

    const save = async (req, res) => {
        const cliente = { ...req.body }
        if (req.params.id) cliente.id = req.params.id

        try {
            existe(cliente.nome, "Nome não informado!")
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (cliente.id) {
            app.db('clientes')
                .update(cliente)
                .where({ id: cliente.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('clientes')
                .insert(cliente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('clientes')
            .select('id', 'nome', 'email', 'telefone', 'endereco', 'cidade')
            .then(clientes => res.json(clientes))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('clientes')
            .select('id', 'nome', 'email', 'telefone', 'endereco', 'cidade')
            .where({ id: req.params.id })
            .then(cliente => res.json(cliente))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const cliente = await app.db('clientes')
                .delete()
                .where({ id: req.params.id})
            existe(cliente, "Usuário não foi encontrado!")

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}