module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false,
            require:true
        },
        author: {
            type: Sequelize.STRING,
            allowNull:false,
            require:true
        },
        authorId: {
            type: Sequelize.INTEGER,
            allowNull:false,
            require:true
        }
    },{paranoid: true})
    return Comment;
} 