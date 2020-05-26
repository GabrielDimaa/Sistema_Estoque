module.exports = app => {
    const { existe, naoExiste, igual } = app.api.validation

    const save = async (req, res) => {
        const fornecedor = { ...req.body }
        if (req.params.id) fornecedor.id = req.params.id

        try {
            existe(fornecedor.nome, "Nome não informado!")

            const fornecedorDB = await app.db('fornecedores')
                .where({ nome: fornecedor.nome })
                .first()
            if (!fornecedor.id) {
                naoExiste(fornecedorDB, "Fornecedor já cadastrado!")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (fornecedor.id) {
            app.db('fornecedores')
                .update(fornecedor)
                .where({ id: fornecedor.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('fornecedores')
                .insert(fornecedor)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('fornecedores')
            .select('id', 'nome', 'email', 'telefone', 'cnpj', 'endereco', 'cidade')
            .then(fornecedor => res.json(fornecedor))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('fornecedores')
            .select('id', 'nome', 'email', 'telefone', 'cnpj', 'endereco', 'cidade')
            .where({ id: req.params.id })
            .then(fornecedor => res.json(fornecedor))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const fornecedor = await app.db('fornecedores')
                .delete()
                .where({ id: req.params.id })
            existe(fornecedor, "Fornecedor não encontrado!")

            res.status(204).send()
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}