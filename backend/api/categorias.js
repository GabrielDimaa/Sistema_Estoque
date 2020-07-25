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
            .then(async categorias => res.json(await categoriasComCaminho(categorias)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categorias')
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

            if (!subDB && !produtoDB) {
                const categoria = await app.db('categorias')
                    .where({ id: req.params.id })
                    .first()
                    .delete()
                existe(categoria, "Categoria não encontrada!")
            }

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const categoriasComCaminho = async categorias => {
        const getPai = (subcategorias, idPai) => {
            const pai = subcategorias.filter(pai => pai.id === idPai)
            return pai ? pai[0] : null
        }

        const subcategorias = await app.db('subcategorias')

        const caminho = subcategorias.map(sub => {
            let sequencia = sub.nome
            let pai = getPai(subcategorias, sub.id_pai)
            let ultimo
            let id_pai = null
            let categoria_id = null

            if (pai) {
                while (pai) {
                    sequencia = `${pai.nome} > ${sequencia}`
                    ultimo = pai
                    pai = getPai(subcategorias, pai.id_pai)
                }

                let categoria = categorias.filter(categoria => categoria.id === ultimo.categoria_id)
                sequencia = `${categoria[0].nome} > ${sequencia}`
                id_pai = sub.id_pai
                categoria_id = ultimo.categoria_id
            } else {
                let categoria_ = categorias.filter(categoria => categoria.id === sub.categoria_id)
                sequencia = `${categoria_[0].nome} > ${sub.nome}`
                categoria_id = sub.categoria_id
            }

            let objeto = {
                id: sub.id,
                nome: sequencia,
                categoria_id,
                id_pai
            }

            return objeto
        })
        
        return categorias.concat(caminho)
    }

    return { save, get, getById, remove }
}   