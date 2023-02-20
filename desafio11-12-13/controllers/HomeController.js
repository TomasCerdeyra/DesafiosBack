import ModelProduct from "../models/produtcModel.js";
import logger from "../utils/logger.js";


const listHomeAndProducts = async (req, res) => {
    try {
        const products = await ModelProduct.find({ user: req.user.id }).lean()
        console.log(req.user.userName);
        res.render('home', { products: products })
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

const addProduct = async (req, res) => {
    const { name, price, description, image } = req.body
    try {
        await ModelProduct.create({ name: name, price: price, description: description, image: image, user: req.user.id })
        logger.info('product add: /home')
        res.redirect('/')
    } catch (error) {
        logger.info('Problema con el ingreso del producto: /home')
        res.redirect('/')
    }
}

const editProductFomr = async (req, res) => {
    const { id } = req.params
    try {
        const prod = await ModelProduct.findById(id).lean()
        res.render('home', { prod })
    } catch (error) {
        res.redirect('/')
    }
}

const editProduct = async (req, res) => {
    const { id } = req.params
    const { name, price, description, image } = req.body
    try {
        console.log(name);
        const prod = await ModelProduct.findById(id)
        await prod.updateOne({ name, price, description, image })

        logger.info('prod editado: /home/editar/:id')
        res.redirect('/')
    } catch (error) {
        logger.info('Problema al editar producto: /home')
        res.redirect('/')
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const prod = await ModelProduct.findById(id)
        //recordad validar que sea ese usuario para q pueda eliminar
        await prod.remove()
        logger.info('Articulo eliminado: /home/eliminar/:id')
        res.redirect('/')
    } catch (error) {
        logger.info('Problema al eliminar producto: /home')
        res.redirect("/")
    }
}


export {
    listHomeAndProducts,
    addProduct,
    editProductFomr,
    editProduct,
    deleteProduct,
}