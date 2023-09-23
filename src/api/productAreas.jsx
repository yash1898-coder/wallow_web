import { axiosPrivate } from "./config"
import axios from "axios"

export const getProductArea = async (id) => {
    try {
        const res = await axiosPrivate.get(
            `/product/area/list/?prod-area-id=${id}`
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

export const getProductAreas = async (productId) => {
    try {
        const res = await axiosPrivate.get(`/product/area/list/${productId}`)
        return res.data.product_areas
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const getProductAreaSummary = async (id) => {
    try {
        const res = await axiosPrivate.get(
            `/product/summary/?type=product_area_id&type_id=${id}`
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

export const addProductAreaTeam = async (productAreaId, teamId) => {
    try {
        const res = await axiosPrivate.post(
            `/product/area/teams/${productAreaId}/`,
            { Team: teamId }
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

export const deleteProductAreaTeam = async (productAreaId, teamId) => {
    try {
        const res = await axiosPrivate.delete(
            `/product/area/teams/${productAreaId}/`,
            { data: { Team: teamId } }
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

export const createProductArea = async (product, data) => {
    try {
        const res = await axiosPrivate.post(`/product/area/create/`, data, {
            params: {
                product,
            },
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

export const editProductArea = async (id, data) => {
    try {
        const res = await axiosPrivate.put(`/product/area/${id}/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const deleteProductArea = async (id) => {
    try {
        const res = await axiosPrivate.delete(`/product/area/${id}/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
