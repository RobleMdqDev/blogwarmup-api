const router = require('express').Router();

const {Posts} = require('../../db');
const { check, validationResult } = require('express-validator');

router.get('/', async(req, res) => {
    const posts = await Posts.findAll();
    res.json(posts);
})

router.get('/:postId', async(req, res) => {
    const posts = await Posts.findOne({
        where: {id: req.params.postId} 
    });
    if (!posts) {
        return res.status(422).json({error: "No existe ese elemento"});
    }
    res.json(posts);
})

router.post('/', [
    check('titulo', "El titulo es obligatorio").not().isEmpty(),
    check('contenido', "El contenido es obligatorio").not().isEmpty(),
    check('imagen', "Ingresar url de la imagen").not().isEmpty(),
    check('id_categoria', "La categoria es obligatoria").not().isEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errores: errors.array()})
    }

    const posts = await Posts.create(req.body);
    res.json(posts);
});

router.patch('/:postId', async (req, res)=>{
    await Posts.update(req.body, {
        where: {id: req.params.postId}
    }).then((resp)=>{
        if (resp > 0) {
            res.json({success: "Se modifico correctamente"});
        }else{
            res.status(422).json({error: "No existe ese elemento"}); 
        }        
    })
    .catch((error) => {
        res.status(500).send({error: error.message});
    })   
    
});

router.delete('/:postId', async (req, res)=>{
    await Posts.destroy({
        where: {id: req.params.postId}
    }).then((resp)=>{
        if (resp > 0) {
            res.json({success: "Se elimino el Post"});
        }else{
            res.status(422).json({error: "No existe ese elemento"}); 
        }  
        
    }).catch((error)=>{
        res.status(500).send({error: error.message});
    });
    
})

module.exports = router;