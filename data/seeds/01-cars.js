// STRETCH
const cars = [
    {
        vin: '1111111111111',
        make: 'toyota',
        model: 'prius',
        mileage: 214000,
        title: 'clean',
        transmission: 'automatic',
    },
    {
        vin: '1111111111112',
        make: 'toyota',
        model: 'corolla',
        mileage: 14000,
        title: 'salvage',
        transmission: 'manual',
    },
    {
        vin: '1111111111113',
        make: 'ford',
        model: 'focus',
        mileage: 4000,
    }
]

// exports.seed = function (knex) {
//     return knex('cars')
//     .truncate().then(() => {
//         return knex('cars').insert(cars)
//     })
// }

exports.seed = async function (knex) {
    await knex('cars').truncate()
    await knex('cars').insert(cars)
    }
