module.exports = (sequelize, type) => {
    return sequelize.define('posts', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: type.STRING,
            allowNull: false
        },
        contenido: {
            type: type.STRING,
            allowNull: false
        },
        imagen: {
            type: type.STRING,
            allowNull: false
        },
        id_categoria: {
            type: type.INTEGER,
            allowNull: false
        },
        fecha: {
            type: type.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
    });
}