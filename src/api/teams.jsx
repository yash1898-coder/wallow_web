import { axiosPrivate } from "./config"
import axios from "axios"

export const getTeams = async (productId) => {
    try {
        const res = await axiosPrivate.get(`/product/team/${productId}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const getTeam = async (id) => {
    try {
        const res = await axiosPrivate.get(`/team-detail/${id}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const getTeamWithChart = async (id) => {
    try {
        const res = await axiosPrivate.get(`/team-detail/${id}`, {
            params: { graph: "graph" },
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
export const transferTeamOwnership = async (userId, teamId) => {
    try {
        const res = await axiosPrivate.post(`/transfer-ownership/team/`, {
            team_id: teamId,
            user_id: userId,
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

export const inviteToTeam = async (data) => {
    try {
        const res = await axiosPrivate.post(`/invite-member/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const inviteToTeamCheck = async (email, teamId) => {
    try {
        const res = await axiosPrivate.post(`/check/team-invite/`, {
            email,
            team: teamId,
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

export const joinTeam = async (id, name) => {
    try {
        const res = await axiosPrivate.get(`/join-team/${id}/${name}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const rejectTeam = async (id, name) => {
    try {
        const res = await axiosPrivate.get(`/reject-team/${id}/${name}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const getDailyScrum = async (id) => {
    try {
        const res = await axiosPrivate.get(`/get-analysis/${id}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const getTeamMembers = async (id) => {
    try {
        const res = await axiosPrivate.get(`/team-members/${id}`)
        return res.data.members
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const editFeedbackReply = async (id, reply) => {
    try {
        const res = await axiosPrivate.put(`/replies/${id}/`, { reply })
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const deleteFeedbackReply = async (id) => {
    try {
        const res = await axiosPrivate.delete(`/replies/${id}/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const replyToFeedback = async (data) => {
    try {
        const res = await axiosPrivate.post(`/replies/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const submitFeedback = async (data) => {
    try {
        const res = await axiosPrivate.post(`/submit-feedback/`, data, {
            headers: { "Content-Type": "multipart/form-data" },
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

export const createTeam = async (productId, data) => {
    try {
        const res = await axiosPrivate.post(`/team-create/`, data, {
            params: {
                product: productId,
            },
            headers: { "Content-Type": "multipart/form-data" },
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

export const addPeopleToTeam = async (data) => {
    try {
        const res = await axiosPrivate.post(`/product/area/members/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const editTeam = async (id, data) => {
    try {
        const res = await axiosPrivate.put(`/team-update/${id}/`, data, {
            headers: { "Content-Type": "multipart/form-data" },
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

export const deleteTeam = async (id) => {
    try {
        const res = await axiosPrivate.delete(`/team-update/${id}/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
