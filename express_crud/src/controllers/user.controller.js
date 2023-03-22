const express = require('express');
const User = require('../modules/user.module');
const router = express.Router();


router.post('/', async (req, res)=>{
    try {
        const user = await User.create(req.body);
        res.status(201).send({user});
    } catch (error) {
        res.status(404).send({error});
    }
})

router.get('/', async (req, res)=>{
    try {
        const user = await User.find({})
        res.status(200).send({user});
    } catch (error) {
        
    }
})

router.patch('/:id', async (req, res)=>{
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).send({user});
    } catch (error) {
        res.status(404).send({error});
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete(id, req.body, {new: true});
        res.status(201).send({user});
    } catch (error) {
        res.status(404).send({error});
    }
})

module.exports = router;