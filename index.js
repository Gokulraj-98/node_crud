// const express = require('express')
// const { MongoClient } = require('mongodb');
import express from "express"
import { MongoClient } from "mongodb"
import * as dotenv from 'dotenv'
import {productsRouter} from "./routes/products.js"
dotenv.config()

const app = express()
const PORT = 3000

//Inbuilt middleware =>  say data is in json => converting body to json
app.use(express.json())

// console.log(process.env.MONGO_URL)

//mongo connection 

const MONGO_URL = process.env.MONGO_URL
// 'mongodb://127.0.0.1:27017'
//'mongodb://localhost:27017';

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect()
    console.log("Mongodb is connected")
    return client
}

export const client = await createConnection()

app.get('/', (req, res) => {
    res.send('Hello Everyone')
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    try {
        //db.products.findOne({ id: id })
        const product = await client.db("B53-node").collection("products").updateOne({ id: id },{})
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

// /products => get all products ✅
// /products?category=laptop => filter based on category ✅
// /products?rating=5  => filter based on rating ✅
// /products?category=laptop&rating=5  =>  filter based on category and then rating ✅

app.use("/products", productsRouter)

app.listen(PORT, () => console.log(`Server started on the PORT, ${PORT}`))