import { Outlet } from "react-router-dom"
import { ModalWrapper } from "../components/Modals/ModalWrapper"
import { useStore } from "../stores/useStore"
import { UploadImageModal } from "../components/Modals/UploadImageModal"
import { Toast } from "../components/Toast"
import { OrganizationHeader } from "./OrganizationHeader"
import { EditProfileModal } from "../components/Modals/EditProfileModal"
import { SendInviteModal } from "../components/Modals/SendInviteModal/SendInviteModal"
import { inviteToOrganizationCheck } from "../api/organization"
import { CookieNotice } from "../components/CookieNotice"
import { useSetUserRole } from "../hooks/useSetUserRole"
import { useOrganization } from "../hooks/useOrganization"
import { useInviteToOrganization } from "../hooks/useInviteToOrganization"

export const OrganizationLayout = () => {
    useSetUserRole()

    const { modals } = useStore()

    const { membersData } = useOrganization()

    const {
        inviteToOrganizationError,
        onSendInviteToOrganization,
        inviteToOrganizationLoading,
    } = useInviteToOrganization()

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-main">
                <CookieNotice />
                <OrganizationHeader />
                <ModalWrapper open={modals["editProfile"]}>
                    <EditProfileModal />
                </ModalWrapper>
                <ModalWrapper open={modals["uploadProfileImage"]}>
                    <UploadImageModal modal={"uploadProfileImage"} />
                </ModalWrapper>
                <ModalWrapper open={modals["sendInviteOrganization"]}>
                    <SendInviteModal
                        isLoading={inviteToOrganizationLoading}
                        sendInviteError={inviteToOrganizationError}
                        members={membersData?.Members.map((item) => ({
                            ...item.User,
                            role: item.role,
                        }))}
                        onCheckForOrgMember={(value) =>
                            inviteToOrganizationCheck(value)
                        }
                        onSend={onSendInviteToOrganization}
                        modal={"sendInviteOrganization"}
                        inviteTo={membersData?.Organization?.name}
                    />
                </ModalWrapper>
                <main>
                    <Toast />
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
