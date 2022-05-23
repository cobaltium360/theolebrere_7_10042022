module.exports = (sequelize, Sequelize) => {
    const Dislike = sequelize.define('dislike', {
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
    return Dislike;
} 