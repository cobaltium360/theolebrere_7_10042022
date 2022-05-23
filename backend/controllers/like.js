const db = require('../models')
const likeModel = db.like;
const dislikeModel = db.dislike;
const postModel = db.post;
const { Op } = require('sequelize');

exports.createlike = (req, res, next) =>{
    
    async function likes(){
        auth = req.auth.split(' ');
        userId2 = auth[0];
        roleId = auth[1];
        if(req.params.idpostlike && req.params.idlike){
            const post = await postModel.findByPk(req.params.idpostlike);
            if(post){
                if(req.params.idlike == 1){
                    const verif = await likeModel.findOne({ where: {[Op.and]: [{ postId: req.params.idpostlike }, { userId: userId2 }] }});
                    if(verif == null){
                        const dislike = await dislikeModel.findOne({where: {[Op.and]: [{ postId: req.params.idpostlike }, { userId: userId2 }] }});
                        if(dislike){
                            await dislike.destroy();

                            const like = await likeModel.build({
                                userId: userId2,
                                postId: req.params.idpostlike
                            });
                            like.save().then(() => res.status(200).json({ message: 'like ajouté!'}))
                            .catch(error => res.status(400).json({ error }));
                        }else{
                            const like = await likeModel.build({
                                userId: userId2,
                                postId: req.params.idpostlike
                            });
                            like.save().then(() => res.status(200).json({ message: 'like ajouté!'}))
                            .catch(error => res.status(400).json({ error }));
                        }
                
                    }else{
                        res.status(401).json({message : "impossible l'user a deja liker ce post"})
                    }
                }else{
                    if(req.params.idlike == 2){
                        const verifDislike = await dislikeModel.findOne({ where: {[Op.and]: [{ postId: req.params.idpostlike }, { userId: userId2 }] }});
                        if(verifDislike == null){
                            const dejaLike = await likeModel.findOne({where: {[Op.and]: [{ postId: req.params.idpostlike }, { userId: userId2 }] }});
                            if(dejaLike){
                                await dejaLike.destroy();
                
                                const newdislike = await dislikeModel.build({
                                    userId: userId2,
                                    postId: req.params.idpostlike
                                });
                                newdislike.save()
                                    .then(() => res.status(200).json({ message: 'dislike ajouté!'}))
                                    .catch(error => res.status(400).json({ error }));
                            }else{
                                const newdislike = await dislikeModel.build({
                                    userId: userId2,
                                    postId: req.params.idpostlike
                                });
                                newdislike.save()
                                    .then(() => res.status(200).json({ message: 'dislike ajouté!'}))
                                    .catch(error => res.status(400).json({ error }));
                
                            }
                        }else{
                            res.status(401).json({message : "deja disliker"})
                        }
                    }else{
                        res.status(404).json({message : "idk"})
                    }
                }
            }else{
                res.status(401).json({message : "post introuvable"})
            }
        }
    }
    likes();
}
   
exports.Unlike = (req, res, next) =>{

    async function unlike(){
        auth = req.auth.split(' ');
        userId2 = auth[0];
        roleId = auth[1];

        if(req.params.idpostunlike && req.params.idunlike){
            const post = await postModel.findByPk(req.params.idpostunlike);
            if(post){
                if(req.params.idunlike == 1){
                    const veriflike = await likeModel.findOne({ where: {[Op.and]: [{ postId: req.params.idpostunlike }, { userId: userId2 }] }});
                    if(veriflike){
                        await veriflike.destroy()
                            .then(() => res.status(200).json({ message: "Vous n'aimez plus ce post"}))
                            .catch(error => res.status(400).json({ error }));
                    }else{
                        res.status(401).json({message : "impossible d'unlike vous n'aimez deja pas ce post"})
                    }
                }else{
                    if(req.params.idunlike == 2){
                        const verifdislike = await dislikeModel.findOne({ where: {[Op.and]: [{ postId: req.params.idpostunlike }, { userId: userId2 }] }});
                        if(verifdislike){
                            await verifdislike.destroy()
                                .then(() => res.status(200).json({ message: "Vous n'aimez plus ce post"}))
                                .catch(error => res.status(400).json({ error }));
                        }else{
                            res.status(401).json({message : "impossible d'enlever le dislike vous ne disliker deja pas ce post"})
                        }
                    }else{
                        res.status(404).json({message : "idk"})
                    }
                }
            }else{
                res.status(401).json({message : "post introuvable"})
            }
        }
    }

    unlike();
        
}