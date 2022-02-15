const Cars = require('./cars-model');
const db = require('../../data/db-config');


const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if(!car) {
      next({ status: 404, message: `car with id ${req.params.id} is not found` })
    } else {
      req.car = car;
      next()
    }
  } catch(err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const error = { status: 400 };
  const { vin, make, model, mileage } = req.body;
  if (vin === undefined) {
    error.message = 'vin is missing';
  } else if (make === undefined) {
    error.message = 'make is missing';
  }else if ( model === undefined) {
    error.message = 'model is  missing';
  }else if ( mileage === undefined) {
    error.message = 'mileage is missing';
  }
  if (error.message) {
    next(error)
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  if(!vin || !vin.trim()) {
    res.status(400).json({ message: `vin ${vin} is invalid`})
  } else {
    req.vin = vin.trim();
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existing = await db('cars')
      .where('vin', req.body.vin.trim())
      .first()
    if(existing) {
      next({ status: 400, message: `vin ${req.body.vin.trim()} already exists` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
};