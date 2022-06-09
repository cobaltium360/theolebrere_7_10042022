# theolebrere_7_10042022
dans le dossier backend :
- créer un dossier "images"
- npm install
- créer un ficher ".env" avec les variables "DB_PASS" pour le mot de passe de MySql et "JWTPRIV8" pour la clé privé du JsonWebToken
- si votre nom d'utilisateur de MySql n'est pas "root" il faut modifier le pseudo dans backend > models > index.js
- si votre base de donnée ne s'appelle pas "groupomania" il faut mettre le bon nom de la bdd dans backend > models > index.js
- Lors de l'initialisation du projet pour passer Administrateur il faut directement changer le roleId (dans la table Users) du compte en question a 3 (avec une commande Sql)

Dans le dossier Frontend : 
- npm install
- créer un fichier ".env" avec la varibale "PORT" pour changer le port par default
