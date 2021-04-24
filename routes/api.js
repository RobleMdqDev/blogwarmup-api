const router = require('express').Router();

const apiPostsRouter = require('./api/posts');
const apiCategoriasRouter = require('./api/categorias');

router.use('/posts', apiPostsRouter);
router.use('/categorias', apiCategoriasRouter);

module.exports = router;