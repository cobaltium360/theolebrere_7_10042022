const passwordValidator = require('password-validator');
const Joi = require('joi'); 


const schemaPass = new passwordValidator();

const register = Joi.object({
    username: Joi.string()
        .pattern(/^[A-Za-z0-9_-]{3,16}$/, "username")
        .required(),

    nom: Joi.string()
        .pattern(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$/, "nom")
        .required(),

    prenom: Joi.string()
        .pattern(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$/, "prenom")
        .required(),
    
    email:Joi.string()
        .email()
        .required()
})


schemaPass
.is().min(6)
.is().max(40)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);


module.exports = (req, res, next) => {
    
    if(schemaPass.validate(req.body.password) && !register.validate({username: req.body.username, prenom: req.body.firstname, nom: req.body.lastname, email: req.body.email}).error){
    next();
    }else{
        res.status(400).json({error : `Le mot de passe n'est pas assez fort`})
    }
}