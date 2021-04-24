const router = require('express').Router();

const {Categorias} = require('../../db');

router.get('/', async(req, res) => {
    const categorias = await Categorias.findAll();
    res.json(categorias);
})

router.get('/:categoriaId', async(req, res) => {
    const categorias = await Categorias.findOne({
        where: {id: req.params.categoriaId} 
    });
    if (!categorias) {
        return res.status(422).json({error: "No existe ese elemento"});
    }
    res.json(categorias);
})

router.post('/', [
    check('nombre', "El nombre es obligatorio").not().isEmpty()    
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errores: errors.array()})
    }

    const categorias = await Categorias.create(req.body);
    res.json(categorias);
});

router.patch('/:categoriaId', async (req, res)=>{
    await Categorias.update(req.body, {
        where: {id: req.params.categoriaId}
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

router.delete('/:categoriaId', async (req, res)=>{
    await Categorias.destroy({
        where: {id: req.params.categoriaId}
    }).then((resp)=>{
        if (resp > 0) {
            res.json({success: "Se elimino correctamente"});
        }else{
            res.status(422).json({error: "No existe ese elemento"}); 
        }        
    })
    .catch((error) => {
        res.status(500).send({error: error.message});
    }) 
    
});

module.exports = router;