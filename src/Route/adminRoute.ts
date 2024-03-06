import express from "express";
import { createAdmin, readAdmin, updateAdmin, deleteAdmin, loginAdmin } from "../Controller/adminController";
import { verifyAdmin } from "../Middleware/verifyAdmin";
const app = express()

app.use(express.json())

app.get(`/admin`, verifyAdmin, readAdmin)
app.post(`/admin`, createAdmin)

app.put(`/admin`, verifyAdmin, updateAdmin)
app.delete(`/admin`, verifyAdmin, deleteAdmin)

app.post(`/admin/login`, loginAdmin)
export default app