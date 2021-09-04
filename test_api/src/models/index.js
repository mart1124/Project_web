const dbCon = require('../dbCon');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbCon.DB, dbCon.USER, dbCon.PASSWORD, {
    host: dbCon.HOST,
    dialect: dbCon.dialect,
    oparetersAliases: false,

    pool: {
        max: dbCon.pool.max,
        min: dbCon.pool.min,
        acquire: dbCon.pool.acquire,
        idle: dbCon.pool.idle
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.files = require("./file.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.auth = require("./auth.model")(sequelize, Sequelize);

module.exports = db;