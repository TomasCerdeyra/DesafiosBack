import ModelChat from '../../components/models/modelChat.js';
import logger from "../../utils/logger.js";

const chat = async (req, res) => {
    try {
        const msjs = await ModelChat.find().lean()
        res.render('chat', { msjs: msjs })
        logger.info('Un usuario mando un mensaje correctamente /chat')
    } catch (error) {
        res.redirect('/chat')
    }
}

const AddAndRedirectChat = async (req, res) => {
    const newMsj = req.body
    try {
        await ModelChat.create(newMsj)
        res.redirect('/chat')
    } catch (error) {
        res.redirect('/chat')
    }
}

export {
    AddAndRedirectChat,
    chat
}