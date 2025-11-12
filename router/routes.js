import express from 'express'
import {allUsers, createUser, deleteUser, forgotPassword, login, updateUser} from '../controllers/userController.js';
const router = express.Router();

router.post('/', createUser)
router.get('/allUsers', allUsers)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)

export default router