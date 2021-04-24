const Sequelize = require('sequelize');

const PostModel = require('./models/posts');

const CategoriasModel = require('./models/categorias');


const sequelize = new Sequelize('blogs', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
});

const Posts = PostModel(sequelize, Sequelize);

const Categorias = CategoriasModel(sequelize, Sequelize);

sequelize.sync({ force: false})
.then(()=>{
    console.log("Tablas sincronizadas");
})
.catch((error)=>{
    console.log(error.message);
})

module.exports = {
    Posts,
    Categorias
};
