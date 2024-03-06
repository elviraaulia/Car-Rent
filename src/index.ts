import express, { Request, Response } from "express";
import adminroute from "./Route/adminRoute"
import carroute from "./Route/carRoute";
import rentroute from "./Route/rentRout"

const app=express()

const PORT = 8000

app.use(express.json())

app.use(adminroute)
app.use(carroute)
app.use(rentroute)

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})