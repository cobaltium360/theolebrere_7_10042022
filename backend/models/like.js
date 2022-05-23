module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define('like', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId :{
            type: Sequelize.INTEGER,
            allowNull:false,
            require:true
        }
    })
    return Like;
} 