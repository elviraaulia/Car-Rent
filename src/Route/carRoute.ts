import express from "express";
import { createCar, readCar, updateCar, deleteCar } from "../Controller/carController";
const app = express()

app.use(express.json())

app.get(`/car`, readCar)
app.post(`/car`, createCar)

app.put(`/car/:car_id`, updateCar)
app.delete(`/car/:car_id`, deleteCar)

export default app