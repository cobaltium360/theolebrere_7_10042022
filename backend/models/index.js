const Sequelize = require('sequelize')

const sequelize = new Sequelize('groupomania', 'root', process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require('./post')(sequelize, Sequelize);
db.like = require('./like')(sequelize, Sequelize);
db.dislike = require('./dislike')(sequelize, Sequelize);
db.user = require('./auth')(sequelize, Sequelize);
db.comment = require('./comment')(sequelize, Sequelize);

db.user.hasMany(db.post);
db.post.belongsTo(db.user);

db.post.hasMany(db.comment);
db.comment.belongsTo(db.post, {
  onDelete: "CASCADE",
});

db.post.hasMany(db.like);
db.like.belongsTo(db.post, {
  onDelete: "CASCADE",
});

db.post.hasMany(db.dislike);
db.dislike.belongsTo(db.post, {
  onDelete: "CASCADE",
});


module.exports = db; 