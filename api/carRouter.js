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

module.exports = router;