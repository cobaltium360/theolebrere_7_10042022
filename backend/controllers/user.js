const db = require('../models')
const userModel = db.user;
const postModel = db.post;
const fs = require('fs');
const post = require('../models/post');
const commentModel = db.comment;



exports.modifProfile = (req, res, next) => {

    async function updateUser(){
        const update = req.body.update
        auth = req.auth.split(' ');
        userId = auth[0];
        roleId = auth[1];
        const account = await userModel.findOne({ where: { id: userId } });
        if(account == null){
            res.status(400).json({message: "l'utilisateur n'existe pas"})
        }else{
            if(req.file){
                if(req.body.profileinfo){
                    const post = postModel.findOne({where :{userId: userId}});
                    if(account.id == userId){
                        const info = JSON.parse(req.body.profileinfo);
                        if(account.imageUrl == null){
                            
                            if(post){
                                await postModel.update(
                                    {authorImg : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`},
                                    { where :{userId : userId}}
                                )
                            }
                        
                            await account.update({
                                ...info,
                                imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                            }).then(() => res.status(201).json({ message: 'Profile modifié !'}))
                            .catch(error => res.status(400).json({ error }));
                        }else{
                            
                            const filename = account.imageUrl.split('/images/')[1];

                            if(post){
                                await postModel.update(
                                    {authorImg : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`},
                                    { where :{userId : userId}}
                                )
                            }

                            fs.unlink(`images/${filename}`, () => {
                                account.update({  
                                  ...info,
                                  imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                                })
                                .then(() => res.status(200).json({ message: 'Profile modifié !'}))
                                .catch(error => res.status(400).json({ error }));
                            });
                        }
                    }else{
                        res.status(401).json({message : "pas autoriser"})
                    }
                }else{
                    if(account.imageUrl == null){
                        if(post){
                            await postModel.update(
                                {authorImg : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`},
                                { where :{userId : userId}}
                            )
                        }

                        await account.update({
                            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                        }).then(() => res.status(200).json({ message: 'Profile modifié !'}))
                        .catch(error => res.status(400).json({ error }));
                    }else{
                        
                        const filename = account.imageUrl.split('/images/')[1];

                        if(post){
                            await postModel.update(
                                {authorImg : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`},
                                { where :{userId : userId}}
                            )
                        }

                        fs.unlink(`images/${filename}`, () => {
                            account.update({  
                              imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                            })
                            .then(() => res.status(200).json({ message: 'Profile modifié !'}))
                            .catch(error => res.status(400).json({ error }));
                        });
                    }
                }
            }else{
                if(account.id == userId){
                    if(!update.description && !req.body.delete && !update.firstname && !update.lastname){
                        res.status(400).json({message : "pas de description"})
                    }else{
                        if(update){
                            console.log('ok')
                            await account.update({
                                ...update
                            }).then(() => res.status(200).json({ message: 'Profile modifié !'}))
                            .catch(error => res.status(400).json({ error }));
                            return;
                        }
                        if(req.body.delete == 1 && account.imageUrl != null){
                            const filename = account.imageUrl.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => { 
                                account.update({
                                    imageUrl: null
                                })
                                .then(() => res.status(200).json({ message: 'Photo supprimé !'}))
                                .catch(error => res.status(400).json({ error }));
                            });
                        }else{
                            if(req.body.delete == 2 && account.description != null){
                                account.update({
                                    description: null
                                }).then(() => res.status(200).json({ message: 'Description supprimé !'}))
                                .catch(error => res.status(400).json({ error }));
                            }else{
                                res.status(401).json({message : "image ou description déja vide"});
                            }
                        }
                    }
                }else{
                    res.status(401).json({message : "pas autoriser"})
                }
            }
        }
    }
    updateUser();
} 

exports.delete = (req, res, next) =>{
    async function deleteUser(){

        
        auth = req.auth.split(' ');
        userId = auth[0];
        roleId = auth[1];

        const account = await userModel.findByPk( req.params.id, {paranoid:false});
        if(account){
            if(account.id == userId || roleId == 2 || roleId == 3){
                if(req.params.delete == 1){
                    if(roleId == 2 && account.roleId == 3){
                        res.status(401).json({message : "pas autoriser"})
                    }else{
                        await account.destroy({
                            where: {
                                id: req.params.id
                            }
                        }).then(() => res.status(200).json({ message: 'Compte bien désactivé !'}))
                        .catch(error => res.status(400).json({ error }));
                    }
                    
                }else{
                    if(req.params.delete == 2){
                        if(roleId == 2 && account.roleId == 3){
                            res.status(401).json({message : "pas autoriser"})
                        }else{
                            await account.destroy({
                                where: {
                                    id: req.params.id
                                },
                                force: true
                            }).then(() => res.status(200).json({ message: 'Compte bien supprimé !'}))
                            .catch(error => res.status(400).json({ error }));
                        }
                        
                    }else{
                        if(req.params.delete == 3){
                            if(roleId == 2 && account.roleId == 3){
                                res.status(401).json({message : "pas autoriser"})
                            }else{
                                await account.restore()
                                .then(() => res.status(200).json({ message: 'Compte bien réactivé !'}))
                                .catch(error => res.status(400).json({ error }));
                            }
                            
                        }else{
                            res.status(400).json({message : "erreur lors de l'action"})
                        }
                    }
                }
            }else{
                res.status(401).json({message : "pas autoriser"})
            }
        }else{
            res.status(400).json({message : "user non trouvé"})
        }
        
        
    }
    deleteUser();
}

exports.getAllUsers = (req, res, next) => {

    userModel.findAll({paranoid:false, attributes: {exclude: ['password']}})
    .then((data) => res.send(data))
    .catch((error) => res.status(500).send(error))
}

exports.getOneUser = (req, res, next) => {
    auth = req.auth.split(' ');
    userId = auth[0];
    roleId = auth[1];

    async function oneUser(){
        const user = await userModel.findByPk( req.params.id, {include : [{model : postModel,  include: [commentModel]}], paranoid:false});
        
        if(user){
            const userAuthor = {
                username: user.username,
                createdAt: user.createdAt,
                email: user.email,
                lastname: user.lastname,
                firstname: user.firstname,
                updatedAt: user.updatedAt,
                deletedAt: user.deletedAt,
                id: user.id,
                imageUrl: user.imageUrl,
                roleId: user.roleId,
                posts: user.posts,
                description: user.description
            }
    
            const userNotAuthor = {
                username: user.username,
                imageUrl: user.imageUrl,
                posts: user.posts,
                description: user.description
            }

            if(req.params.id == userId){
                res.status(200).send(userAuthor);
            }else{
                if(user.deletedAt){
                    res.status(200).json({message : "utilisateur a désactiver son compte"})
                    console.log('ok')
                }else{
                    res.status(200).send(userNotAuthor)
                }
                
            }
            
        }else{
            res.status(200).json({messageI: `user ${req.params.id} inexistant`});
        }
    }
    oneUser();
        

    
} 