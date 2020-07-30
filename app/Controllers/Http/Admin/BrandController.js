'use strict'

const Database = use('Database')
const sanitize = require('sqlstring')

class BrandController {
    
    async index({view, request, response}) {
        try {
            let allBrands =  await Database.raw(`
            SELECT brands.id, brands.title, brands.image_url, brands.user_id,
            CONCAT(users.f_name, ' ', users.l_name) as user,
            brands.created_at,
            brands.updated_at
            FROM brands
             INNER JOIN users
             ON brands.user_id = users.id
             ORDER BY created_at ASC
            `)
            allBrands = allBrands[0]
            return view.render('/admin/brands/all', {allBrands})

            } catch (error) {
                response.redirect('back')
            }
    }

    async store({request, response}) {
        try {
            const post = request.post()
           await Database.raw(`
                INSERT INTO brands (title, image_url, description, user_id)
                Values(${sanitize.escape(post.title)}, 
                ${sanitize.escape(post.image_url)}, 
                ${sanitize.escape(post.description)},
                ${parseInt(1)})
            `)
            return response.redirect('/admin/brands')
            } catch (error) {
                return response.redirect('/')
            }
        }

    create({view, request, response}) {
        return view.render('admin/brands/create')
    }

    async show({view, request, response, params}) {
        try {
            let brand =  await Database.raw(`
            SELECT brands.id, 
            brands.title, 
            brands.sku,
            brands.image_url,
            brands.material,
            brands.description,
            brands.qty,
            brands.size,
            brands.user_id,
            brands.created_at,
            brands.title as brand,
            concat(users.f_name, " ", users.l_name ) as user
            FROM brands
            INNER JOIN brands
             ON brands.brand_id = brands.id
             INNER JOIN users
             ON brands.user_id = users.id
             WHERE brands.id = ${params.id}
             ORDER BY created_at ASC
             LIMIT 1
            `)
            brand = brand[0][0]
            return view.render('admin/brands/show', {brand})

            } catch (error) {
                response.redirect('back')
            }
    }

    async edit({view, request, response, params}) {

        try {
            let brand =  await Database.raw(`
            SELECT brands.id, 
            brands.title, 
            brands.sku,
            brands.image_url,
            brands.material,
            brands.description,
            brands.qty,
            brands.size,
            brands.user_id,
            brands.created_at,
            brands.title as brand,
            concat(users.f_name, " ", users.l_name ) as user
            FROM brands
            INNER JOIN brands
             ON brands.brand_id = brands.id
             INNER JOIN users
             ON brands.user_id = users.id
             WHERE brands.id = ${params.id}
             ORDER BY created_at ASC
             LIMIT 1
            `)
            brand = brand[0][0]
            return view.render('admin/brands/edit', {brand})

            } catch (error) {
                response.redirect('back')
            }
    }

    async update({request, response, params}) {
        try {
            const id = params.id
            const post = request.post()
           await Database.raw(`
                
                UPDATE brands 
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
            return response.redirect(`/admin/brands/${id}`)
            } catch (error) {
                return response.redirect('back')
            }
    }

     async delete({request, response, params}) {
        try {
            const id = params.id
           await Database.raw(`
                DELETE FROM brands
                WHERE id = ${id}
            `)
            return response.redirect(`/admin/brands`)
            } catch (error) {
                return response.redirect('back')
            }
    }
}

module.exports = BrandController
