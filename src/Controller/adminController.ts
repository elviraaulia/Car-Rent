import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { Request, Response } from "express";
import { request } from "http";
import md5 from "md5";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient()

const createAdmin = async (request: Request, response: Response) => {
    try {
        const nama_admin = request.body.nama_admin
        const email = request.body.email
        const password = md5(request.body.password)

        const newData = await prisma.admin.create({
            data: {
                nama_admin,
                email,
                password
            }
        })
        return response
            .status(200)
            .json({
                status: true,
                message: `admin has been created`
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const readAdmin = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 1;
        const keyword = request.query.keyword?.toString() || ""
        const dataAdmin = await prisma.admin.findMany({
            take: qty,
            skip: (page - 1) * qty,
            where: {
                OR: [
                    { email: { contains: keyword } },
                ]
            },
            orderBy: { email: "asc" }
        })
        return response
            .status(200)
            .json({
                status: true,
                message: `admin has been loaded`,
                data: dataAdmin
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const updateAdmin = async (request: Request, response: Response) => {
    try {
        const admin_id = Number(request.params.admin_id)
        const email = request.body.email
        const nama_admin = request.body.nama_admin
        const password = md5(request.body.password)

        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(admin_id) }
        })

        if (!findAdmin) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data admin not found`
                })
        }

        const dataAdmin = await prisma.admin.update({
            where: { id: Number(admin_id) },
            data: {
                email: email || findAdmin.email,
                password: password || findAdmin.password,
                nama_admin: nama_admin || findAdmin.nama_admin
            }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Admin has been update`,
                data: dataAdmin
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const deleteAdmin = async (request: Request, response: Response) => {
    try {
        const admin_id = request.params.admin_id
        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(admin_id) }
        })

        if (!findAdmin) {
            return response.status(400)
                .json({
                    statys: false,
                    message: `Admin not found`
                })
        }

        const dataAdmin = await prisma.admin.delete({
            where: { id: Number(admin_id) }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Data admin has been deleted`
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}
const loginAdmin = async (request: Request, response: Response) => {
    try {
        const email = request.body.email
        const password = md5(request.body.password)
        const admin = await prisma.admin.findFirst(
            {
                where: {email: email, password: password}
            }
        )

        if (admin) {
            const payload = admin
            const secretkey = `mcqueen`
            const token = sign(payload, secretkey)
            return response.status(200).json({
                status: true,
                message: "login masuk",
                token : token
            })
        }

        else {
            return response.status(200).json({
                status: false,
                message: "gagal masuk"
            })
        }

    } catch (error) {
        return response
        .status(500)
        .json({
            status: false,
            message: error
        })
    }
}


export { createAdmin, readAdmin, updateAdmin, deleteAdmin, loginAdmin }