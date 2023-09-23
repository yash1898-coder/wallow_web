import { axiosPrivate } from "./config"
import axios from "axios"

export const getInsights = async (productId, teamFunction) => {
    try {
        const res = await axiosPrivate.get(
            `/product/insights/?product_id=${productId}&function=${teamFunction}`
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
