
exports.up = function(knex) {
    return knex.schema.createTable('sales', function(tbl) {
        tbl.increments('sale_id').primary();

        tbl.boolean('vin').notNullable();

    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sales');
};
