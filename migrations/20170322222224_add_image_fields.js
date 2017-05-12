
exports.up = function (knex, Promise) {
    return Promise.all([knex.schema.table('event', (table) => {
        table.string('file_name').unique();
    }),
    knex.schema.table('artist', (table) => {
        table.string('file_name').unique();
    })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([knex.schema.table('event', (table) => {
        table.dropColumn('file_name');
    }),
    knex.schema.table('artist', (table) => {
        table.dropColumn('file_name');
    })
    ])
};
