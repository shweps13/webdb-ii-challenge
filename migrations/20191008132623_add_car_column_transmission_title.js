
exports.up = function(knex) {
    return knex.schema.table('cars', tbl => {
        tbl.string('transmission', 12);
        tbl.string('title', 12);
    })
};

exports.down = function(knex) {
    return knex.schema.table('cars', tbl => {
        tbl.dropColumn('transmission');
        tbl.dropColumn('title');
    })
};
