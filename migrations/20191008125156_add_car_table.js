
exports.up = function(knex) {
    return knex.schema.createTable('cars', function(tbl) {
        tbl.increments();

        tbl.string('vin', 64).notNullable();
        tbl.string('make', 32).notNullable();
        tbl.string('model', 32).notNullable();
        tbl.integer('mileage', 16).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('geese');
};
