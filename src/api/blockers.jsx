import { axiosPrivate } from "./config"
import axios from "axios"

export const getBlockers = async (productId) => {
    try {
        const res = await axiosPrivate.get(
            `/product/daily-blockers/?product_id=${productId}`
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

export const replyToBlocker = async (data) => {
    try {
        const res = await axiosPrivate.post(`/blocker/replies/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const editBlockerReply = async (id, reply) => {
    try {
        const res = await axiosPrivate.put(`/blocker/replies/${id}/`, { reply })
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const deleteBlockerReply = async (id) => {
    try {
        const res = await axiosPrivate.delete(`/blocker/replies/${id}/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
