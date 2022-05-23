const db = require('../models')
const userModel = db.user;

exports.createAdmin = (req, res, next) => {
    async function createAdmin(){
        auth = req.auth.split(' ');
        userId2 = auth[0];
        roleId = auth[1];

        if(roleId == 3){
            if(req.params.iduser && req.params.optionupdo){
                if(userId2 == req.params.iduser){
                    res.status(401).json({message : "unauthorize"})
                }else{
                    if(req.params.optionupdo == 1){
                        const user = await userModel.findByPk(req.params.iduser);
                        if(user){
                            await user.update({
                                roleId: 2
                            }).then(() => res.status(200).json({ message: 'user upgraded!'}))
                            .catch(error => res.status(400).json({ error }));
                        }else{
                            res.status(400).json({message : "user introuvable"})
                        }
                    }else if(req.params.optionupdo == 2){
                        const user = await userModel.findByPk(req.params.iduser);
                        if(user){
                            await user.update({
                                roleId: 1
                            }).then(() => res.status(200).json({ message: 'user downgraded!'}))
                            .catch(error => res.status(400).json({ error }));
                        }else{
                            res.status(400).json({message : "user introuvable"})
                        }
                    }else{
                        res.status(400).json({message : "option ne correspondant a aucune action"})
                    }
                }
            }else{
                res.status(400).json({message : "information manquante"})
            }
            
        }else{
            res.status(401).json({message : "unauthorize"})
        }
    }
    createAdmin();
}