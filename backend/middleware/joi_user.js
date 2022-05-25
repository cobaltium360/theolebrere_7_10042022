const Joi = require('joi'); 


const schema = Joi.object({
    firstname: Joi.string()
        .pattern(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$/, "prenom"),

    lastname: Joi.string()
        .pattern(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$/, "nom"),

    description: Joi.string()
        .max(200)
})

module.exports = (req, res, next) => {
    if(req.body.update){
        if(!schema.validate({...req.body.update}).error){
            next()
        }else{
            res.status(401).json({error : 'Vous ne respectez pas les regex'})
        }
    }else{
        if(req.body.profileinfo){
            const info = JSON.parse(req.body.profileinfo);
            if(!schema.validate({...info}).error){
                next()
            }else{
                res.status(401).json({error : 'Vous ne respectez pas les regex'})
            }    
        }else{
            next();
        }
    }
}