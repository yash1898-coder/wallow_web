import { axiosPrivate } from "./config"
import axios from "axios"

export const getProducts = async () => {
    try {
        const res = await axiosPrivate.get(`/product/list/`)
        return res.data.context
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response)
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const getProduct = async (id) => {
    try {
        const res = await axiosPrivate.get(`/product/list/`, {
            params: {
                "prod-id": id,
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
export const transferProductOwnership = async (userId, productId) => {
    try {
        const res = await axiosPrivate.post(`/transfer-ownership/product/`, {
            product_id: productId,
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
export const inviteToProduct = async (data) => {
    try {
        const res = await axiosPrivate.post(`/invite-member/product/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const inviteToProductCheck = async (email, productId) => {
    try {
        const res = await axiosPrivate.post(`/check/product-invite/`, {
            email,
            product: productId,
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

export const joinProduct = async (id, name) => {
    try {
        const res = await axiosPrivate.get(`/join-product/${id}/${name}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const rejectProduct = async (id, name) => {
    try {
        const res = await axiosPrivate.get(`/reject-product/${id}/${name}`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const getProductMembers = async (id) => {
    try {
        const res = await axiosPrivate.get(`/product/members/`, {
            params: {
                product: id,
            },
        })
        return res.data.manage_members
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const createProduct = async (data) => {
    try {
        const res = await axiosPrivate.post(`/product/create/`, data)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const editProduct = async (id, data) => {
    try {
        const res = await axiosPrivate.put(`/product/${id}/`, data, {
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

export const uploadProductImage = async (id, data) => {
    try {
        const res = await axiosPrivate.put(`/product/${id}/image/`, data, {
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

export const deleteProduct = async (id) => {
    try {
        const res = await axiosPrivate.delete(`/product/${id}/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}

export const deleteProductMember = async (userId) => {
    try {
        const res = await axiosPrivate.put(`/accounts/user/delete/${userId}/`)
        return res.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.detail)
        } else {
            throw new Error("Unknown Error")
        }
    }
}
export const activateProductMember = async (userId) => {
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
export const deactivateProductMember = async (userId) => {
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

export const changeProductMemberAccountType = async (
    userId,
    productId,
    body
) => {
    try {
        const res = await axiosPrivate.put(
            `/product/members/?id=${userId}&product=${productId}`,
            { role: body }
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
