import express from 'express';
import dotenv from 'dotenv';
import mongoose from  'mongoose';
import userController from './controllers/api/User.js';
import passport from 'passport';
import cors from 'cors';
import passportConfig from './config/passport';
dotenv.config();
const app = express (),
    [port, url, ip] = [process.env.PORT, process.env.DB_URL,  process.env.IP];
    app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(url, {useNewUrlParser:true, useFindAndModify:false, autoIndex:false, useCreateIndex:true})
    .then(()=> console.log('connected to Database'))
    .catch((err)=> console.log(err));

app.use(passport.initialize())
passportConfig(passport);

app.get('/', (req, res)=> {
    res.json ({message:'you hit the MERN route'});
});

app.use('/api/v1/user/', userController);

const server = app.listen(port, ip, (req, res)=> {
    console.log(`MERN api started and running in on port ${port}`);
    });