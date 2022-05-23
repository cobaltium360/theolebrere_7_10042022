const db = require('../models')
const userModel = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Op } = require('sequelize');


exports.signup = (req, res, next) => {
    async function register(){

        if(req.body.email && req.body.firstname && req.body.lastname && req.body.username){
            const verif = await userModel.findOne({ where: {[Op.or]: [{ email: req.body.email }, { username: req.body.username }] }, paranoid:false});
            if (verif === null) {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = userModel.build({ email: req.body.email , password: hash, firstname: req.body.firstname, lastname: req.body.lastname, roleId: 1, username: req.body.username });
                        user.save()
                            .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
                            .catch(error => res.status(400).json({ error }));
                    }).catch(error => res.status(500).json({ error }));
            }else{
                res.status(400).json({message : "email ou username deja existant"});
            }
        }else{
            res.status(400).json({message : "il manque des informations"});
        }
    }
    register();
}; 

exports.signin = (req, res, next) => {
    async function login() {
        if (req.body.email) {
            console.log(req.body.email);
            console.log(req.body.password);
            const account = await userModel.findOne({ where: { email: req.body.email }, paranoid: false });
            if (account == null) {
                res.status(400).json({ message: "l'utilisateur n'existe pas" })
            } else {
                bcrypt.compare(req.body.password, account.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect !' });
                        }
                        res.status(200).json({
                            userId: account.id,
                            username: account.username,
                            token: jwt.sign(
                                {
                                    userId: account.id,
                                    roleId: account.roleId
                                },
                                process.env.JWTPRIV8,
                                { expiresIn: '24h' }
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error: " oui" }));
            }

        }else {
            res.status(500).json({ error: " oui" })
        }
    }
    login();
}