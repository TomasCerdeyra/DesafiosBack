import { URL } from 'url'

const validateURL = (req, res, next) => {
    try {
        const { image } = req.body
        const urlImage = new URL(image)
        //.origin !== null si es distinto de null entre comillas pasa al next por q el "null" es q no hay una url valida
        if (urlImage.origin !== "null") {
            if (urlImage.protocol === "http:" || urlImage.protocol === "https:") {
                return next()
            }
            throw new Error('Tinene q tener https://')
        }
        throw new Error('La URL no es valida')
    } catch (error) {
        if (error.message === "Invalid URL") {
            req.flash("mensajes", [{ msg: "La URL no es valida" }])
        }else{
            req.flash("mensajes", [{ msg: error.message }])
        }
        return res.redirect("/")
    }
}

export default validateURL