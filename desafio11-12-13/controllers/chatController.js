import ModelChat from "../models/modelChat.js";


const chat = async (req, res) => {
    try {
        const msjs = await ModelChat.find().lean()
        res.render('chat', { msjs: msjs })
    } catch (error) {
        console.log(error);
        res.redirect('/chat')
    }
}

const AddAndRedirectChat = async (req, res) => {
    const newMsj = req.body
    try {
        await ModelChat.create(newMsj)
        console.log('chat add');

        res.redirect('/chat')
    } catch (error) {
        console.log(error);
        res.redirect('/chat')
    }
}


export {
    AddAndRedirectChat,
    chat
}