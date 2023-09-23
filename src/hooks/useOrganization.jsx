import { useQuery } from "react-query"
import {
    getOrganizationDetails,
    getOrganizationMembers,
} from "../api/organization"

export const useOrganization = () => {
    const {
        isLoading: membersLoading,
        error: membersError,
        data: membersData,
    } = useQuery(["organization", "members"], () => getOrganizationMembers(), {
        retry: false,
    })
    const {
        isLoading: organizationLoading,
        error: organizationError,
        data: organization,
    } = useQuery(["organization", "details"], () => getOrganizationDetails(), {
        retry: false,
    })

    return {
        membersData,
        membersLoading,
        membersError,
        organizationLoading,
        organizationError,
        organization,
    }
}
