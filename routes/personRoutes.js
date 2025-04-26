const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

// Routes pour les personnes
router.post('/', personController.createPerson);
router.post('/many', personController.createManyPeople);
router.get('/name/:name', personController.findPeopleByName);
router.get('/food/:food', personController.findOneByFood);
router.get('/:id', personController.findPersonById);
router.put('/:id', personController.updatePerson);
router.put('/age/:name', personController.updateAge);
router.delete('/:id', personController.deletePerson);
router.delete('/remove/mary', personController.deleteMarys);
router.get('/search/burritos', personController.chainSearch);

module.exports = router; 