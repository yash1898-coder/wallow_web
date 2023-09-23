import { axiosPrivate } from "./config"
import axios from "axios"

export const getUserRecords = async () => {
    try {
        const res = await axiosPrivate.get(`/user-records`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const getPreference = async () => {
    try {
        const res = await axiosPrivate.get(`/preference`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const updatePreference = async (data) => {
    try {
        const res = await axiosPrivate.put(`/preference/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const updateInvoice = async (id) => {
    try {
        const res = await axiosPrivate.get(`/update-invoice/${id}/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const getInvoices = async () => {
    try {
        const res = await axiosPrivate.get(`/invoices`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const getInvoice = async (id) => {
    try {
        const res = await axiosPrivate.get(`/invoice/${id}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const getCards = async () => {
    try {
        const res = await axiosPrivate.get(`/card`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const getCard = async (id) => {
    try {
        const res = await axiosPrivate.get(`/card/${id}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const createCard = async (data) => {
    try {
        const res = await axiosPrivate.post(`/card/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const updateCard = async (data, id) => {
    try {
        const res = await axiosPrivate.put(`/card/${id}/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const deleteCard = async (data, id) => {
    try {
        const res = await axiosPrivate.delete(`/card/${id}/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
