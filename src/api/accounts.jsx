import myAxios, { axiosPrivate } from "./config"
import axios from "axios"

export const getUsers = async () => {
    try {
        const res = await axiosPrivate.get(`/account/user-list/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.non_field_errors[0])
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const getNotifications = async () => {
    try {
        const res = await axiosPrivate.get(`/notifications`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const createAccount = async (data) => {
    try {
        const res = await myAxios.post(`/account/registration/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response.data.email)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const updateAccount = async (data) => {
    try {
        const res = await axiosPrivate.put(`/account/user-profile/`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.non_field_errors[0])
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const login = async (credentials) => {
    try {
        const res = await myAxios.post(`/account/login/`, credentials)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.non_field_errors[0])
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const logout = async () => {
    try {
        const res = await myAxios.post(`/account/logout/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.non_field_errors[0])
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const checkUser = async (data) => {
    try {
        const res = await myAxios.post(`/account/check-user/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.non_field_errors[0])
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const resendEmail = async (data) => {
    try {
        const res = await myAxios.post(
            `/account/registration/resend-email/`,
            data
        )
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.non_field_errors[0])
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const verifyEmail = async (data) => {
    try {
        const res = await myAxios.post(
            `/account/registration/verify-email/`,
            data
        )
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const sendResetPasswordLink = async (data) => {
    try {
        const res = await myAxios.post(`/account/password/reset/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.non_field_errors[0])
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const resetPassword = async (data) => {
    try {
        const res = await myAxios.post(`/account/password/reset/confirm/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.non_field_errors[0])
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const uploadProfileImage = async (data) => {
    try {
        const res = await axiosPrivate.put(`/accounts/profile-image/`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data?.error)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const updateOrganization = async (data) => {
    try {
        const res = await axiosPrivate.put(`/account/organization/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.non_field_errors[0])
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const cancelOrganization = async (data) => {
    try {
        const res = await axiosPrivate.post(
            `/accounts/cancel-organization/`,
            data
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

export const resumeOrganization = async () => {
    try {
        const res = await axiosPrivate.get(`/accounts/resume-organization/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
