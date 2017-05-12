exports.up = function (knex, Promise) {
    return Promise.all([knex.schema.table('event', (table) => {
        table.dropColumn('number');
        table.integer('state_number');
        table.string('state_code', 50);
        table.timestamp('state_date').defaultTo(knex.fn.now());
    }),
    knex.schema.raw('alter table event_state modify column state varchar(50)')
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([knex.schema.table('event', (table) => {
        table.dropColumn('state_number');
        table.dropColumn('state_code');
        table.integer('number');
        table.dropColumn('state_date');
    }),
    knex.schema.raw('alter table event_state modify column state ENUM("cotizacion", "negociacion", "reserva", "sellado", "finalizado")')
    ])
};
