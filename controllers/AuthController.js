const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login_index = (req,res,next)=>{
    res.render('login/login');
}

const register = (req, res) => {

    console.log(req.body);

    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            console.log(err);
        }
        let user = new User({
            name: req.body.username,
            password: hashedPass
        })
        user.save()
            .then(user => {
                res.json(({
                    user
                }))
            })
            .catch(error => {
                res.json(({
                    message: 'Error'
                }))
            })
    })
}

const login = (req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({name:username})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token= jwt.sign({name:user.name},'veryScretValue',{expiresIn:'1h'})
                    res.json({
                        message: 'Login Successful!',
                        token,
                        username
                    })
                }else{
                    res.json({
                        user,
                        message:'Password does not matched!'
                    })
                }
            })

        }else{
            res.json({
                message:'No user found!'
            })
        }
    })
}
module.exports = {
    login_index,
    register,
    login,
}