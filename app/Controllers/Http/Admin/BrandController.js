'use strict'

const Database = use('Database')
const sanitize = require('sqlstring')

class BrandController {
    
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
            }
    }

    async edit({view, request, response, params}) {

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
            return view.render('admin/products/edit', {product})

            } catch (error) {
                response.redirect('back')
            }
    }

    async update({request, response, params}) {
        try {
            const id = params.id
            const post = request.post()
           await Database.raw(`
                
                UPDATE products 
                SET 
                title = ${sanitize.escape(post.title)}, 
                sku = ${sanitize.escape(post.sku)}, 
                image_url = ${sanitize.escape(post.image_url)}, 
                material = ${sanitize.escape(post.material)}, 
                description = ${sanitize.escape(post.description)}, 
                brand_id = ${parseInt(1)}, 
                qty = ${sanitize.escape(post.qty)}, 
                size = ${sanitize.escape(post.size)}, 
                user_id = ${parseInt(1)}
                WHERE id = ${id}
            `)
            return response.redirect(`/admin/products/${id}`)
            } catch (error) {
                return response.redirect('back')
            }
    }

     async delete({request, response, params}) {
        try {
            const id = params.id
           await Database.raw(`
                DELETE FROM products
                WHERE id = ${id}
            `)
            return response.redirect(`/admin/products`)
            } catch (error) {
                return response.redirect('back')
            }
    }
}

module.exports = BrandController
