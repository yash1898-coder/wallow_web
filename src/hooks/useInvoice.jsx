import { useQuery } from "react-query"
import { getInvoice } from "../api/billing"

export const useInvoice = (id) => {
    const {
        isLoading,
        error,
        data: invoice,
    } = useQuery(["invoices", id], () => getInvoice(id), {
        retry: false,
    })

    return { isLoading, error, invoice }
}
