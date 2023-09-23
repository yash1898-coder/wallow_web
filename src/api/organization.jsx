import { axiosPrivate } from "./config"
import axios from "axios"

export const getOrganizationMembers = async () => {
    try {
        const res = await axiosPrivate.get(`/account/organization/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const getOrganizationDetails = async () => {
    try {
        const res = await axiosPrivate.get(`/account/organization-details/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const changeOrganizationMemberAccountType = async (body) => {
    try {
        const res = await axiosPrivate.put(`/account/organization/`, body)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const updateOrganizationDetails = async (data) => {
    try {
        const res = await axiosPrivate.put(
            `/account/organization-details/`,
            data,
            { headers: { "Content-Type": "multipart/form-data" } }
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

export const activateOrganizationMember = async (userId) => {
    try {
        const res = await axiosPrivate.put(`/accounts/user/activate/${userId}/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const deactivateOrganizationMember = async (userId) => {
    try {
        const res = await axiosPrivate.put(
            `/accounts/user/deactivate/${userId}/`
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

export const transferOrganizationOwnership = async (userId) => {
    try {
        const res = await axiosPrivate.post(
            `/transfer-ownership/organization/`,
            { user_id: userId }
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

export const inviteToOrganization = async (data) => {
    try {
        const res = await axiosPrivate.post(
            `/invite-member/organization/`,
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
export const inviteToOrganizationCheck = async (email) => {
    try {
        const res = await axiosPrivate.post(`/check/organization-invite/`, {
            email,
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

export const joinOrganization = async (id, name) => {
    try {
        const res = await axiosPrivate.get(`/join-organization/${id}/${name}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const rejectOrganization = async (id, name) => {
    try {
        const res = await axiosPrivate.get(`/reject-organization/${id}/${name}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
