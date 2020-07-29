'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToProductsSchema extends Schema {
  up () {
    this.raw(`
      ALTER TABLE products
      ADD COLUMN image_url MEDIUMTEXT AFTER sku 
    `)
  }

  down () {
   this.raw(`
    ALTER TABLE products
    DROP COLUMN image_url
   `)
  }
}

module.exports = AddColumnToProductsSchema
