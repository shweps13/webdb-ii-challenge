
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: '5FNYF3H77CB035807', make: 'Honda', model: 'Odyssey', mileage: 190000},
        {vin: 'U6YKH815NAL075042', make: 'Kia', model: 'Sportage', mileage: 90000},
        {vin: 'U6YKH815NAL075042', make: 'Kia', model: 'Sorento', mileage: 100000}
      ]);
    });
};
