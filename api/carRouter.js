const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)


const router = express.Router();

// === middleware ===
const validateCarId = async (req,res,next) => {
    const { id } = req.params;
    try {
        const car = await db("cars")
            .where({ id })
            .first()
        if(car) {
            req.car = car
            next()
        }
        else {
            res.status(400).json({ message: "Please provide a valid ID" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error: could not retrieve car" })
    }
}

const validateCarData = (req,res,next) => {
    const {body} = req;

    if(!body.vin || !body.make || !body.model || !body.mileage){
        res.status(400).json({message: "Please provide full data about car!"})
    }
    else if (typeof body.mileage !== "number") {
        res.status(400).json({message: "Mileage must be a number"})
    }
    else {
        next()
    }
}

// === operations ===
router.get('/', (req, res) => {

    db('cars')
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.get('/:id', validateCarId, (req, res) => {
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

router.post('/', validateCarData, (req, res) => {
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

router.put('/:id', validateCarId, (req, res) => {
    db('cars')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
        res.status(200).json(count);
    })
    .catch(error => {
        res.status(500).json(error);
    });

});

router.delete('/:id', validateCarId, (req, res) => {
    db('cars')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        res.status(200).json(count);
    })
    .catch(error => {
        res.status(500).json(error);
    });

});

module.exports = router;