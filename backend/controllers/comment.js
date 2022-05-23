const db = require('../models')
const userModel = db.user;
const postModel = db.post;
const commentModel = db.comment;

exports.createComment = (req, res, next) =>{
    async function comment(){
        auth = req.auth.split(' ');
        userId2 = auth[0];
        roleId = auth[1];
        const user = await userModel.findByPk(userId2)
        if(req.body.comment){
            const comment = await commentModel.build({
                text: req.body.comment,
                postId: req.params.idpost,
                author: user.username,
                authorId: user.id
            });
            comment.save()
            .then(() => res.status(200).json({ message: 'commentaire posté !'}))
            .catch(error => res.status(400).json({ error }));
        }else{
            res.status(400).json({message : "il manque des informations"});
        }
       
    }
    comment(); 
} 

exports.updateComment = (req, res, next) =>{
    async function updateComment(){
        auth = req.auth.split(' ');
        userId2 = auth[0];
        roleId = auth[1];
        const user = await userModel.findByPk(userId2);
        const comment = await commentModel.findByPk(req.params.id);
        if(comment){
            if(req.body.comment){
                if(user.username == comment.author){
                    await comment.update({
                        text: req.body.comment
                    }).then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
                    .catch(error => res.status(400).json({ error }));
                }else{
                    res.status(401).json({message : "unauthorize"});
                }   
            }else{
                res.status(400).json({message: "il manque des informations"});
            }
        }else{
            res.status(400).json({message : "commentaire introuvable"});
        }
    }
    updateComment(); 
}

exports.deleteComment = (req, res, next) =>{
    async function deleteComment(){
        auth = req.auth.split(' ');
        userId2 = auth[0];
        roleId = auth[1];
        const user = await userModel.findByPk(userId2);
        const comment = await commentModel.findByPk(req.params.id, {paranoid:false});
        if(comment){
            if(comment.author == user.username || roleId == 2 || roleId == 3){

                if((req.params.delete == 1 && roleId == 2) || (req.params.delete == 1 && roleId == 3)){
                    await comment.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then(() => res.status(200).json({ message: 'commentaire bien désactivé !'}))
                    .catch(error => res.status(400).json({ error }));
                }else{
                    if(req.params.delete == 2){
                        await comment.destroy({
                            where: {
                                id: req.params.id
                            },
                            force: true
                        }).then(() => res.status(200).json({ message: 'commentaire bien supprimé !'}))
                        .catch(error => res.status(400).json({ error }));
                    }else{
                        if((req.params.delete == 3 && roleId == 2) || (req.params.delete == 3 && roleId == 3)){
                            await comment.restore()
                            .then(() => res.status(200).json({ message: 'commentaire bien restaurer!'})) 
                            .catch(error => res.status(400).json({ error }));
                        }else{
                            res.status(400).json({message : "erreur lors de l'action"});
                        }
                    }
                }
            }else{
                res.status(401).json({message : "Unauthorize"});
            }
        }else{
            res.status(400).json({message: "post introuvable"});
        }
    }
    deleteComment();
}