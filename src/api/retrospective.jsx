import { axiosPrivate } from "./config"
import axios from "axios"

export const getRetrospective = async (productId) => {
    try {
        const res = await axiosPrivate.get(
            `/product/daily-retrospectives/?product_id=${productId}`
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
