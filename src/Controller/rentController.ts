import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { request } from "http";

const prisma = new PrismaClient()

export const createRent = async (request: Request, response: Response) => {
    try {
        const car_id = Number(request.body.car_id)
        const nama_penyewa = request.body.nama_penyewa
        const lama_sewa = Number(request.body.lama_sewa)
        const total_harga = Number(request.body.total_harga)
        const tanggal = new Date(request.body.tanggal).toISOString()
        
        const newData = await prisma.rent.create({
            data: {
                car_id,
                nama_penyewa,
                lama_sewa,
                total_harga,
                tanggal

            }
        })

        return response
            .status(200)
            .json({
                status: true,
                message: `Rent has been created`,
                data: newData
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

export const readRent = async (request: Request, response: Response) => {
    try {
        const dataRent = await prisma.rent.findMany()
        return response
            .status(200)
            .json({
                status: true,
                message: `Rent has been loaded`,
                data: dataRent
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

export const updateRent = async (request: Request, response: Response) => {
    try {
        const rent_id = request.params.rent_id

        const car_id = Number(request.body.car_id)
        const nama_penyewa = request.body.userID
        const lama_sewa = Number(request.body.lama_sewa)
        const total_harga = Number(request.body.seatID)
        const tanggal = new Date(request.body.tanggal).toISOString()


        const findRent = await prisma.rent.findFirst({
            where: { rent_id: Number(rent_id) }
        })

        if (!findRent) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data rent not found`
                })

        }

        const dataRent = await prisma.rent.update({
            where: { rent_id: Number(rent_id) },
            data: {
                car_id: car_id || findRent.car_id,
                nama_penyewa: nama_penyewa || findRent.nama_penyewa,
                lama_sewa: lama_sewa || findRent.lama_sewa,
                total_harga: total_harga || findRent.total_harga,
                tanggal: tanggal || findRent.tanggal
            }

        })

        return response.status(200)
            .json({
                status: true,
                message: `Rent has been update`,
                data: dataRent
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

export const deleteRent = async (request: Request, response: Response) => {
    try {
        const rent_id = request.params.rent_id
        const findRent = await prisma.rent.findFirst({
            where: { rent_id: Number(rent_id) }
        })

        if (!findRent) {
            return response.status(400)
                .json({ 
                    status: false,
                    message: `Rent not found` 
                })
        }

        const dataRent = await prisma.rent.delete({
            where: { rent_id: Number(rent_id) }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Data rent has been deleted`
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
