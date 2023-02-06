import express from 'express'
import { AddAndRedirectChat, chat } from '../controllers/chatController.js'

const routeChat = express.Router()

routeChat.get('/', chat)

routeChat.post('/', AddAndRedirectChat)


export default routeChat