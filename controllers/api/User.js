import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validateRegistration from '../../validators/register';
import validateLogin from '../../validators/login';
import User from '../../models/User.js';
const router = express.Router();

router.route('/login')
    .post((req, res)=> {
       try {
           const {errors, isValid} = validateLogin(req.body);
           if(!isValid) {
               res.status(400).json({errors})
           }
           const {email, password} = req.body;
            User.findOne({email:email}, (err, user)=> {
                if(err) {
                    res.status(400).json({message: err.message});
                } else {
                    bcrypt.compare (password, user.password).then((pwMathched)=> {
                        if(pwMathched) {
                            const payload = {
                                id: user.id,
                                name: user.firstName
                              };
                              jwt.sign(
                                payload,
                                process.env.secretKey,
                                {
                                    // One year (in seconds)
                                  expiresIn: 31556926 
                                },
                                (err, token) => {
                                  res.json({
                                    success: true,
                                    token: "Bearer " + token
                                  });
                                }
                              );
                        } else {
                            res.status(400).json({
                                message:"password is incorrect",
                            });
                        }
                    })
                   
                }                
            });
       }
       catch(err) {
           (err)=> console.log(err);
           res.status(400).json({message:err.message})
       }
    })

router.route('/register')
    .post( async (req, res)=> {
    try {
        const {errors, isValid} = validateRegistration(req.body);
        if(!isValid) {
            res.status(400).json({message:errors});
        }
        console.log(errors, isValid, validateRegistration(req.body));
        const details = req.body;
        User.findOne({email:details.email}).then((user)=> {
            if(user) {
                res.status(400).json({message: "user already exist"});
            }
        })
        const user =  new User (details);
        bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(user.password, salt, (err, hash)=> {
                if(err) { console.log (err) } 
                user.password = hash;
                user.save();
                res.status(200).json({
                    message:'User successfully created', 
                    user
                });
            });
        });
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message:err.message});
    }
});

export default router