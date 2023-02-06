import ModelProduct from "../models/produtcModel.js";


const listHomeAndProducts = async (req, res) => {
    try {
        const products = await ModelProduct.find({ user: req.user.id }).lean()
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
        console.log('Product add');
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

const editProductFomr = async (req, res) => {
    const { id } = req.params
    try {
        const prod = await ModelProduct.findById(id).lean()
        res.render('home', { prod })
    } catch (error) {
        console.log(error);
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

        console.log('prdo editado');
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const prod = await ModelProduct.findById(id)
        //recordad validar que sea ese usuario para q pueda eliminar
        await prod.remove()
        console.log('Articulo eliminad');
        res.redirect('/')
    } catch (error) {
        console.log(error);
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