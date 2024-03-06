import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";
import { request } from "http";

const prisma = new PrismaClient()

const createCar = async (request: Request, response: Response) => {
    try {
        const merk_mobil = request.body.merk_mobil
        const nopol = Number(request.body.nopol)
        const harga_perhari = Number(request.body.harga_perhari)

        const newData = await prisma.car.create({
            data: {
                merk_mobil,
                nopol,
                harga_perhari
            }
        })

        return response
            .status(200)
            .json({
                status: true,
                message: `Cars has been created`,
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

const readCar = async (request: Request, response: Response) => {
    try {
        // const page = Number(request.query.page) || 1;
        // const qty = Number(request.query.qty) || 1;
        // const keyword = request.query.keyword?.toString() || ""
        // const dataCar = await prisma.car.findFirst({
        //     take: qty,
        //     skip: (page-1) * qty,
        //     where: {
        //         OR: [
        //             {merk_mobil: {contains: keyword}},
        //         ]
        //     }
        // })

        const dataCar = await prisma.car.findMany()
        return response
            .status(200)
            .json({
                status: true,
                message: `Car has been loaded`,
                data: dataCar
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

const updateCar = async (request: Request, respose: Response) => {
    try {
        const car_id = Number(request.body.car_id)
        const merk_mobil = request.body.merk_mobil
        const nopol = Number(request.body.nopol)
        const harga_perhari = Number(request.body.harga_perhari)


        const findCar = await prisma.car.findFirst({
            where: { car_id: Number(car_id) }
        })

        if (!findCar) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data car not found`
                })
        }

        const dataCar = await prisma.car.update({
            where: { car_id: Number(car_id) },
            data: {
                nopol: nopol || findCar.nopol,
                merk_mobil: merk_mobil || findCar.merk_mobil,
                harga_perhari: harga_perhari || findCar.harga_perhari
            }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Car has been update`,
                data: dataCar
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

const deleteCar = async (request: Request, response: Response) => {
    try {
        const car_id = request.params.car_id
        const findCar = await prisma.car.findFirst({
            where: { car_id: Number(car_id) }
        })

        if (!findCar) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Car not found`
                })
        }

        const deleteCar = await prisma.car.delete({
            where: { car_id: Number(car_id) }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Data car has been deleted`
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

export { createCar, readCar, updateCar, deleteCar }