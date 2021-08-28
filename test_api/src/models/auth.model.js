module.exports = (sequelize, DataTypes) => {
    const auth = sequelize.define("auth",{
        idUser: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    return auth;
};