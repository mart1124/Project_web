module.exports = (sequelize, DataTypes) => {
    const filesStorage = sequelize.define("fileStorage",{
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    
    return filesStorage;
};