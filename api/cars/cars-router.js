const router = require('express').Router();
const Cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');


//[GET] /api/cars returns an array of cars sorted by id (or an empty array if there aren't any).
router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll();
        res.json(cars);
        } catch(err) {
            next(err)
        }
});

// [GET] /api/cars/:id returns a car by the given id.
router.get('/:id', checkCarId, async (req, res, next) => {
    res.json(req.car)
});

// [POST] /api/cars returns the created car.
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try{
        const car = await Cars.create(req.body)
        res.status(201).json(car)
    } catch(err) {
        next(err)
    }
});


module.exports = router;