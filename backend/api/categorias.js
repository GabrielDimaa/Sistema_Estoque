module.exports = app => {
    const { igual, existe, naoExiste } = app.api.validation

    const save = async (req, res) => {
        const categoria = { ...req.body }
        if (req.params.id) categoria.id = req.params.id

        try {
            existe(categoria.nome, "Informe o nome da categoria!")
            
            if (!categoria.id) {
                const categoriaDB = await app.db('categorias')
                    .where({ nome: categoria.nome })
                    .first()
                naoExiste(categoriaDB, "Categoria já cadastrada!")
            } else {
                const categoriaDB_ = await app.db('categorias')
                    .where({ nome: categoria.nome, id: req.params.id })
                    .first()
                if (!categoriaDB_) {
                    const categoriaDB__ = await app.db('categorias')
                        .where({ nome: categoria.nome })
                        .first()
                    naoExiste(categoriaDB__, "Categoria já cadastrada!")
                }
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (categoria.id) {
            app.db('categorias')
                .update(categoria)
                .where({ id: categoria.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categorias')
                .insert(categoria)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('categorias')
            .then(categorias => res.json(categorias))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categorias')
            .select('id', 'nome')
            .where({ id: req.params.id })
            .first()
            .then(categoria => res.json(categoria))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const subDB = await app.db('subcategorias')
                .where({ categoria_id: req.params.id })
                .first()
            naoExiste(subDB, "Categoria possui subcategorias!")

            const produtoDB = await app.db('produtos')
                .where({ categoria_id: req.params.id })
                .first()
            naoExiste(produtoDB, "Categoria possui produtos!")

            if (!subDB || !produtoDB) {
                const categoria = await app.db('categorias')
                    .delete()
                    .where({ id: req.params.id })
                existe(categoria, "Categoria não encontrada!")
            }

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}   