module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            require: true
        },
        username: {
            type: Sequelize.STRING, 
            allowNull:false,
            require: true
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull:false,
            require: true
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull:false,
            require: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            require: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull:true
        }, 
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
        
    },{paranoid: true}) 
    return User;
}