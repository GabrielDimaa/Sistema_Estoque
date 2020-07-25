module.exports = app => {
    function igual(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function existe(value, msg) {
        if (!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
        if(value.includes('>')) throw msg
    }

    function naoExiste(value, msg) {
        try {
            existe(value, msg)
        } catch(msg) {
            return 
        }
        throw msg
    }

    return { igual, existe, naoExiste }
}