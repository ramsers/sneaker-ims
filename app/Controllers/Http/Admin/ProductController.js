'use strict'
const Database = use('Database')
const sanitize = require('sqlstring')

class ProductController {
    async index({view, request, response}) {
        try {
            let allProducts =  await Database.raw(`
                SELECT * FROM products 
            `)
            allProducts = allProducts[0]
            return view.render('admin/products/all', {allProducts})

            } catch (error) {
                response.redirect('back')
                // `<h1 style ="color: red">There was an error</h1>
                // <h3>${error.sqlMessage}</h3>
                // `
            }
    }

    async store({request, response}) {
        try {
            const post = request.post()
           await Database.raw(`
                INSERT INTO products (title, sku, material, description, brand_id, qty, size, user_id)
                Values(${sanitize.escape(post.title)}, 
                ${sanitize.escape(post.sku)}, 
                ${sanitize.escape(post.material)}, 
                ${sanitize.escape(post.description)}, 
                ${parseInt(1)}, 
                ${sanitize.escape(post.qty)}, 
                ${sanitize.escape(post.size)}, 
                ${parseInt(1)})
            `)
            return response.redirect('/admin/products')
            } catch (error) {
                return response.redirect('/')
                // `<h1 style ="color: red">There was an error</h1>
                // <h3>${error.sqlMessage}</h3>
                // `
            }
        }

    create({view, request, response}) {
        return view.render('admin/products/create')
    }

    show({view, request, response}) {
        return view.render('admin/products/show')
    }

    edit({view, request, response}) {
        return view.render('admin/products/edit')
    }

    update({request, response}) {
        
    }

    delete({request, response}) {
        
    }
}

module.exports = ProductController
