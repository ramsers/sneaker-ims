'use strict'
const Database = use('Database')

class ProductController {
    index({view}) {
        return view.render('admin/products/all')
    }

    async store({request, response}) {
        try {
            const post = request.post()
           await Database.raw(`
                INSERT INTO products (title, sku, material, description, brand_id, qty, size, user_id)
                Values('${post.title}', '${post.sku}', '${post.material}', 
                    '${post.description}', 1, ${post.qty}, 1, 1)
            `)
            return `<h1 style ="color: green">Saved Successfully</h1>`
            } catch (error) {
                return `<h1 style ="color: red">There was an error</h1>
                <h3>${error.sqlMessage}</h3>
                `
            }
        }

    create({view}) {
        return view.render('admin/products/create')
    }

    show({view}) {
        return view.render('admin/products/show')
    }

    edit({view}) {
        return view.render('admin/products/edit')
    }

    update() {
        
    }

    delete() {
        
    }
}

module.exports = ProductController
