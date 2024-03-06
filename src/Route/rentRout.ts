import express from "express";
import { createRent, readRent, updateRent, deleteRent } from "../Controller/rentController";
const app = express()

app.use(express.json())

app.get(`/rent`, readRent)
app.post(`/rent`, createRent)

app.put(`/rent/:rent_id`,updateRent)
app.delete(`/rent/:rent_id`,deleteRent)

export default app