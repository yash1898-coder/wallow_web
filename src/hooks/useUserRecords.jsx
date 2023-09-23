import { useQuery } from "react-query"
import { getUserRecords } from "../api/billing"

export const useUserRecords = () => {
    const { isLoading, error, data } = useQuery(
        ["user-records"],
        () => getUserRecords(),
        {
            retry: false,
        }
    )

    const users = data ? Object.values(data) : []
    const dates = data ? Object.keys(data) : []

    return { isLoading, error, dates, users }
}
