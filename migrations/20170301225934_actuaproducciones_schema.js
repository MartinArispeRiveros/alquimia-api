
exports.up = function (knex, Promise) {
  return Promise.all([knex.schema.createTableIfNotExists('user', (table) => {
    table.increments('user_id').primary();
    table.string('user_name', 45).unique().notNullable();
    table.string('password', 128).notNullable();
    table.string('full_name', 128).notNullable();
    table.string('email', 75).defaultTo(null);
    table.string('role', 75).notNullable();
    table.integer('created_by').defaultTo(null);
    table.boolean('is_enabled').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  }),
  knex.schema.createTableIfNotExists('artist', (table) => {
    table.increments('artist_id').primary();
    table.string('name', 100).unique().notNullable();
    table.string('web_page', 100).defaultTo(null);
    table.text('biography').defaultTo(null);
    table.string('category', 75).defaultTo(null);
    table.boolean('is_international').defaultTo(false);
    table.integer('created_by').defaultTo(null);
    table.boolean('is_enabled').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('file_name').unique();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('user_id').inTable('user');
  }),
  knex.schema.createTableIfNotExists('member', (table) => {
    table.increments('member_id').primary();
    table.string('name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.date('birthday').defaultTo(null);
    table.string('identification_number', 75).defaultTo(null);
    table.string('phone', 75).defaultTo(null);
    table.string('address', 75).defaultTo(null);
    table.string('email', 75).defaultTo(null);
    table.text('additional_information').defaultTo(null);
    table.integer('created_by').defaultTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('artist_id').unsigned().notNullable();
    table.boolean('is_holder').defaultTo(false);
    table.boolean('is_enabled').defaultTo(true);
    table.foreign('artist_id').references('artist_id').inTable('artist');
  }),
  knex.schema.createTableIfNotExists('bank_account', (table) => {
    table.increments('bank_account_id').primary();
    table.bigInteger('number').defaultTo(null);
    table.string('name', 100).notNullable();
    table.string('currency', 10).notNullable();
    table.string('owner_identification_number').defaultTo(null);
    table.string('owner_identification_name').defaultTo(null);
    table.string('bank', 75).defaultTo(null);
    table.integer('created_by').defaultTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('artist_id').unsigned().notNullable();
    table.boolean('is_enabled').defaultTo(true);
    table.foreign('artist_id').references('artist_id').inTable('artist');
  }),
  knex.schema.createTableIfNotExists('client', (table) => {
    table.increments('client_id').primary();
    table.string('name', 100).notNullable();
    table.string('last_name').defaultTo(null);
    table.string('company').defaultTo(null);
    table.string('phone', 75).defaultTo(null);
    table.string('address', 75).defaultTo(null);
    table.string('email', 75).defaultTo(null);
    table.text('additional_information').defaultTo(null);
    table.string('city').defaultTo(null);
    table.integer('created_by').defaultTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('is_enabled').defaultTo(true);
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('user_id').inTable('user');
  }),
  knex.schema.createTableIfNotExists('event', (table) => {
    table.increments('event_id').primary();
    table.string('name').defaultTo(null);
    table.string('description', 100).defaultTo(null);
    table.timestamp('start_time').defaultTo(knex.fn.now());
    table.timestamp('end_time').defaultTo(knex.fn.now());
    table.string('location').defaultTo(null);
    table.string('state').defaultTo(null);
    table.decimal('latitude', 10, 6).defaultTo(null);
    table.decimal('longitude', 10, 6).defaultTo(null);
    table.decimal('first_payment', 14, 2).defaultTo(0);
    table.integer('assigned_to').defaultTo(null);
    table.integer('created_by').defaultTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('is_enabled').defaultTo(true);
    table.string('file_name').unique();
    table.integer('client_id').unsigned().notNullable();
    table.boolean('is_private').defaultTo(false);
    table.foreign('client_id').references('client_id').inTable('client');
  }),
  knex.schema.createTableIfNotExists('schedule', (table) => {
    table.increments('schedule_id').primary();
    table.timestamp('start_time').defaultTo(knex.fn.now());
    table.timestamp('end_time').defaultTo(knex.fn.now());
    table.integer('created_by').defaultTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.decimal('price', 14, 2).defaultTo(0);
    table.integer('artist_id').unsigned().notNullable();
    table.integer('event_id').unsigned().notNullable();
    table.boolean('is_enabled').defaultTo(true);
    table.foreign('artist_id').references('artist_id').inTable('artist');
    table.foreign('event_id').references('event_id').inTable('event');
  }),
  knex.schema.createTableIfNotExists('event_state', (table) => {
    table.increments('event_state_id').primary();
    table.integer('number').defaultTo(null);
    table.enu('state', ['cotizacion', 'negociacion', 'reserva', 'sellado', 'finalizado'])
    table.text('description').defaultTo(null);
    table.integer('created_by').defaultTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('is_enabled').defaultTo(true);
    table.integer('event_id').unsigned().notNullable();
    table.foreign('event_id').references('event_id').inTable('event');
  })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('schedule'),
    knex.schema.dropTable('event_state'),
    knex.schema.dropTable('event'),
    knex.schema.dropTable('client'),
    knex.schema.dropTable('bank_account'),
    knex.schema.dropTable('member'),
    knex.schema.dropTable('artist'),
    knex.schema.dropTable('user'),
  ]);
};
