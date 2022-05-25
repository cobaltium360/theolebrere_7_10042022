const Joi = require('joi'); 


const createPost = Joi.object({
    description: Joi.string()
        .max(1000)
})

module.exports = (req, res, next) => {
    if(req.body.description && !createPost.validate({description: req.body.description}).error){
        next();
    }else{
        if(req.body.textpost && !createPost.validate({description: req.body.textpost}).error){
            next();
        }else{
            if(req.body.post && !createPost.validate({description: req.body.post}).error){
                next();
            }else{
                res.status(401).json({error : 'Le maximum de caractère est dépassé (1000)'})
            }
        }
    }
}