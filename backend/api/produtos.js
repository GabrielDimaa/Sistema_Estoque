module.exports = app => {
    const { existe, naoExiste, igual} = app.api.validation

    const save = async (req, res) => {
        const produto = { ...req.body }
        if (req.params.id) produto.id = req.params.id

        try {
            existe(produto.codigo, "Código não informado!")
            existe(produto.nome, "Nome não informado!")
            existe(produto.estoque, "Quantidade em estoque não informado!")

            if (!produto.id) {
                const produtoDB = await app.db('produtos')
                    .where({ codigo: produto.codigo })
                    .first()
                naoExiste(produtoDB, "Código já cadastrado!")
            } else {
                const produtoDB_ = await app.db('produtos')
                    .where({ codigo: produto.codigo, id: req.params.id })
                    .first()
                if (!produtoDB_) {
                    const produtoDB__ = await app.db('produtos')
                        .where({ codigo: produto.codigo })
                        .first()
                    naoExiste(produtoDB__, "Código já cadastrado!")
                }
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (produto.id) {
            app.db('produtos')
                .update(produto)
                .where({ id: produto.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('produtos')
                .insert(produto)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send())
        }
    }

    const get = (req, res) => {
        app.db('produtos')
            .select(
                'id', 
                'codigo', 
                'nome', 
                'estoque', 
                'preco_custo', 
                'preco_venda', 
                'categoria_id', 
                'subcategoria_id')
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).json(err))
    }

    const getById = (req, res) => {
        app.db('produtos')
            .select(
                'id', 
                'codigo', 
                'nome', 
                'estoque', 
                'preco_custo', 
                'preco_venda', 
                'categoria_id', 
                'subcategoria_id')
            .where({ id: req.params.id })
            .first()
            .then(produto => res.json(produto))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const produtoDB = await app.db('produtos')
                .delete()
                .where({ id: req.params.id })
            existe(produtoDB)

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}