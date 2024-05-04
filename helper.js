import {client} from "./index.js";

export async function getALLProducts(query){
    return await client.db("B53-node").collection("products").find(query).toArray()
}
export async function getProductById(id){
    return await client.db("B53-node").collection("products").findOne({id:id}).toArray()
}
export async function addProducts(newProduct){
    return await client.db("B53-node").collection("products").insertMany(newProduct).toArray()
}
export async function deleteProductById(id){
    return await client.db("B53-node").collection("products").deleteOne({id:id}).toArray()
}
export async function updateProductById(id,updatedProduct){
    return await client.db("B53-node").collection("products").updateOne(
        {id:id},
        {$set:updatedProduct}
    
    ).toArray()
}