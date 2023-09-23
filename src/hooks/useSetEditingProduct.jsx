import { useLocation } from "react-router-dom"
import { useQuery } from "react-query"
import { useEditProductStore } from "../stores/useEditProductStore"
import { getProducts } from "../api/products"

export const useSetEditingProduct = () => {
    const { pathname } = useLocation()
    const { editingProduct, setEditingProduct } = useEditProductStore()

    useQuery(["products"], getProducts, {
        enabled: pathname.includes("dashboard"),
        onSuccess: (products) => {
            if (!editingProduct) {
                if (products[0])
                    setEditingProduct({
                        ...products[0],
                        value: products[0].name,
                    })
            }
        },
    })
}
