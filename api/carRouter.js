const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)


const router = express.Router();


router.get('/', (req, res) => {

    db('cars')
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.get('/:id', (req, res) => {
    db('cars')
    .where('id', '=', req.params.id)
    .first()
    .then(car => {
      res.status(200).json(car);
  })
  .catch(error => {
      res.status(500).json(error);
  })

});

router.post('/', (req, res) => {
    const carData = req.body;

    db('cars')
    .insert(carData, 'id')
    .then(ids => {
        res.status(200).json(ids);
    })
    .catch(error => {
        res.status(500).json(error);
    });

});

module.exports = router;