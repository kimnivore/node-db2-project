const Cars = require('./cars-model');
const router = require('express').Router();

const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');


//[GET] /api/cars returns an array of cars sorted by id (or an empty array if there aren't any).
router.get('/', (req, res) => {
    Cars.getAll()
        .then(cars => {

        })
})

// [GET] /api/cars/:id returns a car by the given id.
// [POST] /api/cars returns the created car.



module.exports = router;