const Cars = require('./cars-model');
const router = require('express').Router();

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
        const car = await Cars.create({
            vin: req.body.vin.trim(),
            make: req.body.make.trim(),
            model: req.body.model.trim(),
            mileage: req.body.mileage.trim(),
        })
        res.status(201).json(car)
    } catch(err) {
        next(err)
    }
});


router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
});

module.exports = router;