import knex from "knex"

export default class Contenedor{
    constructor(options, tabla){
        this.options = knex(options)
        this.tabla = tabla
    }

    async crearTabla (tb) {
        try {
            const exists = await this.options.schema.hasTable(this.tabla)
            if(exists) return console.log('Table already exists')
            const created = await this.options.schema.createTable(this.tabla, tb)
            if(created){
                return console.log('Table created')
            } else {
                throw new Error('Table not created')
            }
        } catch(err){
            console.error(err)
        }
    }

    async insertar (obj) {
        try {
            const inserted = await this.options(this.tabla).insert(obj)
            if(!inserted) throw new Error('Entry not saved')
            return true
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async getById (id) {
        try {
            const result = await this.options.from(this.tabla).select().where({id: id})
            if(!result) throw new Error('Not found')
            return result
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async getAll() {
        try {
            const results = await this.options.from(this.tabla).select()
            if(!results) throw new Error('Not found')
            return results
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async deleteById(id) {
        try {
            const deleted = await this.options(this.tabla).where('id', id).del()
            if(!deleted) return false
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }

    async deleteAll() {
        try {
            const deleted = await this.options(this.tabla).del()
            if(!deleted) return false
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }
}