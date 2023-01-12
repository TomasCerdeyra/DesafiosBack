const knex = require('knex')

class Contenedor {
    constructor(options){
        this.knex = knex(options)
        this.tabla = 'mensajes'
    }

    async insertarMensaje(obj){
        try{
            await this.knex(this.tabla).insert(obj)
        } catch (err){
            console.log(err);
        }
    }

    async llevarMensajes(){
        try{
            const resultado = await this.knex(this.tabla).select()
            return resultado
        } catch (err) {
            console.error(err)
            return null
        }
    }
}

module.exports = Contenedor