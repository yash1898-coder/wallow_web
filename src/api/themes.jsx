import { axiosPrivate } from "./config"
import axios from "axios"

export const getThemes = async (id) => {
    try {
        const res = await axiosPrivate.get(`/product/themes/`, {
            params: {
                type: 'product',
                type_id: id
            }
        })
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error('Unknown Error')
        }
    }
}