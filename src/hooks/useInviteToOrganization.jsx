import { useMutation, useQueryClient } from "react-query"
import { useStore } from "../stores/useStore"
import { inviteToOrganization } from "../api/organization"

export const useInviteToOrganization = () => {
    const { openToast, closeModal } = useStore()
    const queryClient = useQueryClient()

    const { isLoading: inviteToOrganizationLoading, error: inviteToOrganizationError, mutate: onSendInviteToOrganization } = useMutation(
        (value) => inviteToOrganization({ email: value }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['organization'])
            queryClient.invalidateQueries(['organization', 'invite'])
            openToast({ text: 'Invite(s) sent!' })
            closeModal('sendInviteOrganization')
        },
    })

    return { inviteToOrganizationError, onSendInviteToOrganization, inviteToOrganizationLoading }
}
