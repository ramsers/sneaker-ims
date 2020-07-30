'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToBrandsSchema extends Schema {
  up () {
    this.raw(`
      ALTER TABLE brands
      ADD COLUMN image_url TEXT
      AFTER title
    `)
  }

  down () {
    this.raw(`
      ALTER TABLE brands
      DROP COLUMN image_url
    `)
  }
}

module.exports = AddColumnToBrandsSchema
