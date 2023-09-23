import { axiosPrivate } from "./config"
import axios from "axios"

export const getProgressSummary = async (productId) => {
    try {
        const res = await axiosPrivate.get(
            `/product/daily-progress/?product_id=${productId}`
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

export const getProgressSummaryWithChart = async (productId) => {
    try {
        const res = await axiosPrivate.get(
            `/product/daily-progress/?product_id=${productId}`,
            { params: { graph: "graph" } }
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
