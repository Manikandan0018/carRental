import express from 'express'


import {signup,verifyOtp,login,contactDetail,updateContact,createOrder} from '../controller/user.control.js'

const app = express();
app.use(express.json());

const router = express.Router();

router.post('/signup',signup)
router.post('/verifyOtp',verifyOtp)
router.post('/login',login)
router.post('/contactDetail',contactDetail)
router.put('/updateContact/:id', updateContact);
router.post('/payment/createOrder', createOrder);





export default router;