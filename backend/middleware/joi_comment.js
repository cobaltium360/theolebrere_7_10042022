const Joi = require('joi'); 


const commentJoi = Joi.object({
    comment: Joi.string()
        .max(500)
})

module.exports = (req, res, next) => {
    if(req.body.comment && !commentJoi.validate({comment: req.body.comment}).error){
        next();
    }else{
        res.status(401).json({error : 'Le maximum de caractère est dépassé (500)'})
    }
}