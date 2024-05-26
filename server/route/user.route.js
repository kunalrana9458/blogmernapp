import express from 'express'
import {deleteUser, deleteUserByAdmin, getUsers, signOut, test,updateUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';


const router  = express.Router();

router.get('/test',test)
router.put('/updates/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/signout',signOut);
router.get('/getusers',verifyToken,getUsers);
router.delete('/deleteusers/:userId',verifyToken,deleteUserByAdmin) // this is for admin so tahat they can delete the users

export default router;  