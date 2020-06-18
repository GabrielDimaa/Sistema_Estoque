module.exports = app => {
    const { existe, naoExiste, igual } = app.api.validation

    const save = async (req, res) => {
        const subcategoria = { ...req.body }
        if (req.params.id) subcategoria.id = req.params.id

        try {
            existe(subcategoria.nome, "Nome não informado!")
            existe(subcategoria.categoria_id, "Subcategoria necessita de uma Categoria!")
            
            if (!subcategoria.id) {
                const subDB = await app.db('subcategorias')
                    .where({ nome: subcategoria.nome })
                    //categoria_id: subcategoria.categoria_id
                    .first()
                naoExiste(subDB, "Subcategoria já cadastrado!")
            } else {
                const subDB_ = await app.db('subcategorias')
                    .where({ nome: subcategoria.nome, id: req.params.id })
                    .first()
                if (!subDB_) {
                    const subDB__ = await app.db('subcategorias')
                        .where({ nome: subcategoria.nome })
                        .first()
                    naoExiste(subDB__, "Subcategoria já cadastrado!")
                }
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (subcategoria.id) {
            app.db('subcategorias')
                .update(subcategoria)
                .where({ id: subcategoria.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('subcategorias')
                .insert(subcategoria)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('subcategorias')
            .then(subcategorias => res.json(subcategorias))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('subcategorias')
            .select('id', 'nome', 'id_pai', 'categoria_id')
            .where({ id: req.params.id })
            .first()
            .then(subcategoria => res.json(subcategoria))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const subDB = await app.db('subcategorias')
                .where({ id_pai: req.params.id })
                .first()
            naoExiste(subDB, "Subcategorias possui subcategorias!")

            const produtoDB = await app.db('produtos')
                .where({ subcategoria_id: req.params.id })
                .first()
            naoExiste(produtoDB, "Subcategorias possui produtos!")

            if (!subDB || !produtoDB) {
                const subcategoria = await app.db('subcategorias')
                    .delete()
                    .where({ id: req.params.id })
                existe(subcategoria, "Subcategoria não encontrada!")
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    
    return { save, get, getById, remove }
}