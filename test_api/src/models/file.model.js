module.exports = (sequelize, DataTypes) => {
    const filesStorage = sequelize.define("fileStorage",{
        type: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        data: {
            type: DataTypes.STRING
        }
    })

    return filesStorage;
}