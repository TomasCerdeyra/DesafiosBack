const { faker } = require('@faker-js/faker');
const { loggerError } = require('../utils/logger');

class ContenedorProductos {

    async getRandom() {
        try {
            const productos = []

            for (let i = 0; i < 5; i++) {
                productos.push({
                    title: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    thumbnail: faker.image.image()
                })
            }

            return productos
        } catch (error) {
            loggerError.error(error);
        }
    }
}

module.exports = ContenedorProductos;