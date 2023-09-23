import { useQuery } from "react-query"
import { getOrganizationMembers } from "../api/organization"
import { useAuthStore } from "../stores/useAuthStore"

export const useSetUserRole = () => {
    const { user, setUser } = useAuthStore()
    const { _ } = useQuery(
        ["organization", "members"],
        () => getOrganizationMembers(),
        {
            retry: false,
            onSuccess: (res) => {
                if (res.Role !== null) setUser({ ...user, role: res.Role })
            },
        }
    )
}
