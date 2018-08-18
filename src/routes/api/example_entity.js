var express = require('express');
var router = express.Router();
var ExampleEntity = require('../../models/exampleEntity');
var uuid = require('node-uuid');

router.delete('/delete/:id', function (req, res, next) {
    let errors = {};
    if(typeof(req.user) === 'undefined') {
        res.status(403).json({'error':'Not authorised'});
        return;
    }
    // if(!req.user.isAdmin) {
    //     res.status(403).json({'error':'Not authorised'});
    // }

    ExampleEntity.findOneAndRemove({ _id: req.params.id })
    .then( () => {
        res.json({ status: 'success', id: req.params.id})
    })
    .catch( (err) => {
        res.status(400).json({ status: 'error', errors:err.errors });
    })

})
router.post('/create', function (req, res, next) {
    let errors = {};
    //create a new entity
    if(typeof(req.user) === 'undefined') {
        res.status(403).json({'error':'Not authorised'});
        return;
    }
    // if(!req.user.isAdmin) {
    //     res.status(403).json({'error':'Not authorised'});
    // }
    
    if(!req.body || Object.keys(req.body).length === 0) {
        res.json({ status: 'error', 'error': 'no body'});
        return;
    }
    
    var entity = new ExampleEntity(req.body);
    
    entity.validate()
    .then(() => {
        return entity.save();
    })
    .then( (entity) => {
        console.log('saved successfully');
        res.json({ status: 'success', entity: entity})
    })
    .catch( (err) => {
        res.status(400).json({ status: 'error', errors:err.errors });
    })
    ;

});


router.get('/all', function (req, res) {
    ExampleEntity.find({}, function (err, entities) {
        res.send(entities);
    });
});

router.get('/:id', (req, res) => {
    ExampleEntity.findById(req.params.id)
    .then( (entity) => {
        res.json(entity)
    })
    .catch( (err) => {
        console.log('error getting entity data');
        res.json({'error': err});
    });
});

router.put('/:id', (req, res, next) => {
    let data = null;
    const userIsAdmin = req.user && req.user.isAdmin;
    
    data = req.body
    
    ExampleEntity.findById(req.params.id, (err, entity) => {
        if(err) {
            res.json({status:'failed', error:err});
            return;
        } else if(entity) {
            Object.assign(entity, data);
            entity.save()
            .then( (entity) => {
                res.json({status:'success', data:entity});
            })
            .catch( (err) => {
                res.status(400).json({status:'error', errors:err.errors})
            })
            ;
        } else {
            res.json({status:'failed', error:'Not found'});
        }
    });
});


module.exports = router;
