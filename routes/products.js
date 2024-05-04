import {getALLProducts, getProductById,addProducts,deleteProductById,updateProductById} from "../helper.js"
import express from "express"
const router = express.Router()

router.get('/products', async (req, res) => {
    const { category, rating } = req.query
    console.log(req.query, category, rating)

    try {
        let query = {} //empty query object
        if (category) {
            query.category = category
        } if (rating) {
            query.rating = +rating
        }
        const filteredProducts = await getALLProducts(query)

        if (filteredProducts.length > 0) {
            res.send(filteredProducts)
        }
        else {
            res.status(404).send({ message: "Product Not found for specified criteria" })
        }

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

//particular product

router.get('/products/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    try {
        //db.products.findOne({ id: id })
        const product = await getProductById(id)
        // const product = await products.find((pd) => pd.id === id)
        if (product) {
            res.send(product)
        } else {
            res.status(404).send({ message: "Product Not Found" })
        }

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

//add products


router.post('/products', async (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    const result = await addProducts(newProduct)
    res.send(result)

})

//delete product

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    const product = await deleteProductById(id)
    res.send(product)

})

router.put('/products/:id', async (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    const result = await updateProductById(id,newProduct)
    res.send(result)

})

export const productsRouter = router