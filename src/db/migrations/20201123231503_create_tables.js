
exports.up = function (knex) {
  return knex.schema
    /** TABLE: 'users' */
    .createTableIfNotExists('users', function (table) {
      table.increments('id').primary()
      table.string('email', 80).notNullable().index().unique()
      table.string('username', 20).notNullable().index().unique()
      table.string('full_name', 80).nullable()
      table.string('password', 124).notNullable()
      table.boolean('is_public').notNullable().index().defaultTo(true)
      table.string('picture', 256).nullable()
      table.text('biography').nullable()
      table.date('joined_at').defaultTo(knex.fn.now())
      table.boolean('is_verified').defaultTo(false)
    })
    /** TABLE: 'tokens' */
    .createTableIfNotExists('tokens', function (table) {
      table.increments('id').primary()
      table.string('token', 512).index().notNullable()
      table.boolean('is_valid').defaultTo(true)
      table.string('username').notNullable().unsigned()
        .references('username').inTable('users').onDelete('cascade')
    })
    /** TABLE: 'friendship' */
    .createTableIfNotExists('friendship', function (table) {
      table.increments('id').primary()
      table.integer('user_from').notNullable().unsigned()
        .references('id').inTable('users').onDelete('cascade')
      table.integer('user_to').notNullable().unsigned()
        .references('id').inTable('users').onDelete('cascade')
      table.enum('status', ['friends', 'pending', 'declined', 'canceled'])
      table.unique(['user_from', 'user_to'])
    })
    /** TABLE: 'habits' */
    .createTableIfNotExists('habits', function (table) {
      table.increments('id').primary()
      table.integer('owner').notNullable().unsigned()
        .references('id').inTable('users').onDelete('cascade')
      table.string('name', 80).notNullable()
      table.enum('frequency', ['daily', 'weekly', 'every_n_days', 'every_n_weeks'])
        .notNullable().defaultTo('daily')
      table.integer('n_frequency').nullable()
      table.boolean('is_public').defaultTo(true)
      table.boolean('in_pause').defaultTo(false)
      table.dateTime('finalized_date').nullable()
    })
    /** TABLE: 'routines' */
    .createTableIfNotExists('routines', function (table) {
      table.increments('id').primary()
      table.integer('habit').notNullable().unsigned()
        .references('id').inTable('habits').onDelete('cascade')
      table.dateTime('time').notNullable()
      table.boolean('complated').defaultTo(false)
      table.dateTime('completed_date').nullable()
      table.string('note', 80).nullable()
      table.unique(['habit', 'time'])
    })
    /** TABLE: 'group' */
    .createTableIfNotExists('groups', function (table) {
      table.increments('id').primary()
      table.integer('habit').notNullable().unsigned()
        .references('id').inTable('habits').onDelete('cascade')
      table.unique(['id', 'habit'])
    })
    /** TABLE: 'users_in_group' */
    .createTableIfNotExists('users_in_group', function (table) {
      table.increments('id').primary()
      table.boolean('user_accept').defaultTo(false)
      table.integer('user').notNullable().unsigned()
        .references('id').inTable('users')
      table.integer('group').notNullable().unsigned()
        .references('id').inTable('groups')
      table.unique(['user', 'group'])
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTable('users')
    .dropTable('habits')
    .dropTable('friendship')
    .dropTable('routines')
    .dropTable('groups')
    .dropTable('users_in_group')
}
