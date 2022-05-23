const { dislike, like } = require('../models');
const db = require('../models')
const userModel = db.user;
const postModel = db.post;
const commentModel = db.comment;
const likeModel = db.like;
const dislikeModel = db.dislike;


require('dotenv').config();

exports.createPost = (req, res, next) =>{
    async function post(){
        auth = req.auth.split(' ');
        userId2 = auth[0];
        roleId = auth[1];

        const user = await userModel.findByPk(userId2)
        
        if(req.file){
            
            if(req.body.textpost){
                const texte = req.body.textpost;
                const post = await postModel.build({
                    text: texte,
                    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                    userId: userId2,
                    author: user.username,
                    authorImg: user.imageUrl
                });
                post.save()
                .then(() => res.status(200).json({ message: 'post crée !'}))
                .catch(error => res.status(400).json({ error }));
            }else{
                const post = await postModel.build({
                    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                    userId: userId2,
                    author: user.username,
                    authorImg: user.imageUrl
                });
                post.save()
                .then(() => res.status(200).json({ message: 'post crée !'}))
                .catch(error => res.status(400).json({ error }));
            }
        }else{
            
            if(req.body.description){
            
                const post = await postModel.build({
                    text: req.body.description,
                    userId: userId2,
                    author: user.username,
                    authorImg: user.imageUrl
                }); 
                post.save()
                .then(() => res.status(200).json({ message: 'post crée !'}))
                .catch(error => res.status(400).json({ error }));
            }else{
                res.status(400).json({message : "il manque des informations"})
            }
        } 
    }
    post(); 
} 

exports.deletePost = (req, res, next) =>{
    async function deletePost(){
        auth = req.auth.split(' ');
        userId2 = auth[0];
        roleId = auth[1];

        const post = await postModel.findByPk(req.params.id,{paranoid:false});
        if(post){
            console.log(post + " " + userId2)
            if(post.userId == userId2 || roleId == 2 || roleId == 3){

                if((req.params.delete == 1 && roleId == 2) || (req.params.delete == 1 && roleId == 3)){
                    await post.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then(() => res.status(200).json({ message: 'post bien désactivé !'}))
                    .catch(error => res.status(400).json({ error }));
                }else{
                    if(req.params.delete == 2){
                        if(req.file){
                            const filename = post.imageUrl.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => {
                            post.destroy({
                                where: {
                                    id: req.params.id
                                },
                                force: true
                            }).then(() => res.status(200).json({ message: 'post bien supprimé !'}))
                            .catch(error => res.status(400).json({ error }));
                            });
                        }
                        post.destroy({
                            where: {
                                id: req.params.id
                            },
                            force: true
                        }).then(() => res.status(200).json({ message: 'post bien supprimé !'}))
                        .catch(error => res.status(400).json({ error }));
                        
                    }else{
                        if((req.params.delete == 3 && roleId == 2) || (req.params.delete == 3 && roleId == 3)){
                            await post.restore()
                            .then(() => res.status(200).json({ message: 'post bien restaurer!'})) 
                            .catch(error => res.status(400).json({ error }));
                        }else{
                            res.status(400).json({message : "erreur lors de l'action"})
                        }
                    }
                }
            }else{
                res.status(401).json({message : "Unauthorize"})
            }
        }else{
            res.status(400).json({message: "post introuvable"})
        }
    }
    deletePost(); 
} 

exports.getAllPost = (req, res, next) =>{
    async function getAllPost(){
        auth = req.auth.split(' ');
        userId2 = auth[0];
        roleId = auth[1];
        
        if(roleId == 2 || roleId == 3){
            postModel.findAll({include : [{model : commentModel, paranoid:false}, {model: likeModel}, {model: dislikeModel}], paranoid:false})
            .then((data) => res.send(data))
            .catch((error) => res.status(500).send(error))
        }else{
            postModel.findAll({include: [{model :commentModel}, {model :likeModel}, {model : dislikeModel}]})
            .then((data) => res.send(data))
            .catch((error) => res.status(500).send(error))
        }
        
    }
    getAllPost(); 
}

exports.updatePost = (req, res, next) =>{
    async function updatepost(){
        auth = req.auth.split(' ');
        userId2 = auth[0];
        roleId = auth[1];
        
        const post = await postModel.findByPk(req.params.id, {include: userModel});

        if(post){
            if(req.body.post){
                console.log(post)
                if(post.userId == userId2){
                    
                    post.update({
                        text: req.body.post
                    }).then(() => res.status(200).json({ message: 'post modifié !'}))
                    .catch(error => res.status(400).json({ error }));
                }else{
                    res.status(401).json({message : "unauthorize"});
                }   
            }else{
                res.status(400).json({message: "il manque des informations"});
            }
        }else{
            res.status(400).json({message : "post introuvable"});
        }

    }
    updatepost();
}

exports.getOnePost = (req, res, next) =>{
    async function onePost(){
        const post = await postModel.findByPk( req.params.id, {include: [{model: commentModel},{model :likeModel}, {model :dislikeModel} ]});
        if(post){
            res.status(200).send(post);
        }else{
            res.status(500).json({message: `post ${req.params.id} inexistant`});
        }
    }
    onePost();
}