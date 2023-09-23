import { axiosPrivate } from "./config"
import axios from "axios"

export const getImpediments = async (productId) => {
    try {
        const res = await axiosPrivate.get(
            `/product/daily-impediments/?product_id=${productId}`
        )
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const replyToImpediment = async (data) => {
    try {
        const res = await axiosPrivate.post(`/impediment/replies/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const editImpedimentReply = async (id, reply) => {
    try {
        const res = await axiosPrivate.put(`/impediment/replies/${id}/`, {
            reply,
        })
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const deleteImpedimentReply = async (id) => {
    try {
        const res = await axiosPrivate.delete(`/impediment/replies/${id}/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
