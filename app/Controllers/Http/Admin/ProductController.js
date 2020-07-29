'use strict'
const Database = use('Database')
const sanitize = require('sqlstring')

class ProductController {
    async index({view, request, response}) {
        try {
            let allProducts =  await Database.raw(`
            SELECT products.id, 
            products.title, products.sku,
            products.material,
            products.qty,
            products.size,
            products.user_id,
            products.created_at,
            brands.title as brand,
            concat(users.f_name, " ", users.l_name ) as user
            FROM products
            INNER JOIN brands
             ON products.brand_id = brands.id
             INNER JOIN users
             ON products.user_id = users.id
             ORDER BY created_at ASC
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
                INSERT INTO products (title, sku, image_url, material, description, brand_id, qty, size, user_id)
                Values(${sanitize.escape(post.title)}, 
                ${sanitize.escape(post.sku)}, 
                ${sanitize.escape(post.image_url)}, 
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

    async show({view, request, response, params}) {
        try {
            let product =  await Database.raw(`
            SELECT products.id, 
            products.title, 
            products.sku,
            products.image_url,
            products.material,
            products.description,
            products.qty,
            products.size,
            products.user_id,
            products.created_at,
            brands.title as brand,
            concat(users.f_name, " ", users.l_name ) as user
            FROM products
            INNER JOIN brands
             ON products.brand_id = brands.id
             INNER JOIN users
             ON products.user_id = users.id
             WHERE products.id = ${params.id}
             ORDER BY created_at ASC
             LIMIT 1
            `)
            product = product[0][0]
            return view.render('admin/products/show', {product})

            } catch (error) {
                response.redirect('back')
                // `<h1 style ="color: red">There was an error</h1>
                // <h3>${error.sqlMessage}</h3>
                // `
            }
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
