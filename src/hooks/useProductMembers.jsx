import { useQuery } from "react-query"
import { useEditProductStore } from "../stores/useEditProductStore"
import { getProductMembers } from "../api/products"

export const useProductMembers = () => {
    const { editingProduct } = useEditProductStore()
    const { isLoading, data: members } = useQuery(
        ["products", "members"],
        () => getProductMembers(editingProduct.id),
        {
            retry: false,
        }
    )

    return {
        members,
        isLoading,
    }
}
