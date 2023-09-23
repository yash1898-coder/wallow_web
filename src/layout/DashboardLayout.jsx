import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { DashboardHeader } from "./DashboardHeader"
import { ModalWrapper } from "../components/Modals/ModalWrapper"
import { useStore } from "../stores/useStore"
import { CreateProductModal } from "../components/Modals/CreateProductModal"
import { EditProfileModal } from "../components/Modals/EditProfileModal"
import { CreateTeamModal } from "../components/Modals/CreateTeamModal"
import { CreateProductAreaModal } from "../components/Modals/CreateProductAreaModal"
import { UploadImageModal } from "../components/Modals/UploadImageModal"
import { EditProductModal } from "../components/Modals/EditProductModal"
import { SendInviteModal } from "../components/Modals/SendInviteModal/SendInviteModal"
import { Toast } from "../components/Toast"
import { DeleteProductModal } from "../components/Modals/DeleteProductModal"
import { useEditProductStore } from "../stores/useEditProductStore"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {
    getProductMembers,
    inviteToProduct,
    inviteToProductCheck,
    uploadProductImage,
} from "../api/products"
import { useAuthStore } from "../stores/useAuthStore"
import { uploadProfileImage } from "../api/accounts"
import { CookieNotice } from "../components/CookieNotice"
import { useSetUserRole } from "../hooks/useSetUserRole"
import { useOrganization } from "../hooks/useOrganization"
import { inviteToOrganizationCheck } from "../api/organization"
import { useInviteToOrganization } from "../hooks/useInviteToOrganization"
import { DashboardSlider } from "../components/DashboardSlider"
import { ImagePreviewModal } from "../components/Modals/ImagePreviewModal"
// import productArtifacts from "../../assets/sidebar/productArtifacts.svg"
// import productNews from "../../assets/sidebar/productNews.svg"
// import techStack from "../../assets/sidebar/techStack.svg"
// import techNews from "../../assets/sidebar/techNews.svg"
// import customerFeedback from "../../assets/sidebar/customerFeedback.svg"
// import teamFeedback from "../../assets/sidebar/teamFeedback.svg"

export const DashboardLayout = () => {
    const { modals, openToast, closeModal, closeAllModals } = useStore()
    const { editingProduct, setEditingProduct } = useEditProductStore()
    const { user, setUser } = useAuthStore()
    const { pathname } = useLocation()

    const { data: productMembers } = useQuery(
        ["products", "members", editingProduct?.id ?? ""],
        () => getProductMembers(editingProduct?.id),
        {
            retry: false,
            enabled: !!editingProduct,
        }
    )

    useSetUserRole()
    const { membersData } = useOrganization()

    const queryClient = useQueryClient()
    const {
        isLoading: isSendInviteLoading,
        error,
        mutate: onSend,
    } = useMutation(
        (value) =>
            inviteToProduct({ product_id: editingProduct?.id, email: value }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["products"])
                queryClient.invalidateQueries(["products", "invite"])
                openToast({ text: "Invite(s) sent!" })
                closeModal("sendInviteProduct")
            },
        }
    )

    const {
        inviteToOrganizationError,
        onSendInviteToOrganization,
        inviteToOrganizationLoading,
    } = useInviteToOrganization()

    const {
        isLoading: isProductImageLoading,
        error: productImageError,
        mutate: onUploadProductImage,
    } = useMutation(
        (image) => uploadProductImage(editingProduct?.id, { image }),
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries(["products"])
                queryClient.invalidateQueries(["products", editingProduct?.id])
                openToast({ text: "Image updated" })
                closeModal("uploadProductImage")
                setEditingProduct({
                    ...editingProduct,
                    image: `http://54.235.35.3/${res.image}`,
                })
            },
        }
    )

    const {
        isLoading: isProfileImageLoading,
        error: profileImageError,
        mutate: onUploadProfileImage,
    } = useMutation((image) => uploadProfileImage({ image }), {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["accounts"])
            openToast({ text: "Image updated" })
            closeModal("uploadProfileImage")
            setUser({ ...user, profile_image: res.profile_image })
        },
    })

    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth < 872 ? false : true
    )

    const onSidebarItemClick = () => {
        window.innerWidth < 872 && setSidebarOpen(false)
    }

    const isOnWelcomePage =
        pathname === "/dashboard/" || pathname === "/dashboard"
    const isOnPrintablePage =
        pathname.includes("/invoice-details") || pathname.includes("/receipt")

    useEffect(() => {
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth
        document.body.style.setProperty(
            "--scrollbar-width",
            `${scrollbarWidth}px`
        )
    }, [])

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.setProperty("--sidebar-width", `265px`)
        } else {
            document.body.style.setProperty("--sidebar-width", `0px`)
        }
    }, [sidebarOpen])

    useEffect(() => {
        const onEsc = (e) => {
            if (e.key === "Escape") {
                closeAllModals()
            }
        }

        document.addEventListener("keydown", onEsc)

        return () => {
            document.removeEventListener("keydown", onEsc)
        }
    }, [])

    return (
        <div className="dashboard-wrapper">
            {!isOnWelcomePage && !isOnPrintablePage && (
                <Sidebar
                    setOpen={setSidebarOpen}
                    open={sidebarOpen}
                    onItemClick={onSidebarItemClick}
                />
            )}
            <div className="dashboard-main">
                <CookieNotice />
                <ImagePreviewModal open={modals["imagePreview"]} />
                <ModalWrapper open={modals["createProduct"]}>
                    <CreateProductModal />
                </ModalWrapper>
                {!isOnPrintablePage && (
                    <DashboardHeader
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                )}
                <ModalWrapper open={modals["editProduct"]}>
                    <EditProductModal product={editingProduct?.name} />
                </ModalWrapper>
                {editingProduct?.role === "Primary Product Owner" && (
                    <ModalWrapper open={modals["deleteProduct"]}>
                        <DeleteProductModal />
                    </ModalWrapper>
                )}
                <ModalWrapper open={modals["editProfile"]}>
                    <EditProfileModal />
                </ModalWrapper>
                <ModalWrapper open={modals["createTeam"]}>
                    <CreateTeamModal />
                </ModalWrapper>
                <ModalWrapper open={modals["createProductArea"]}>
                    <CreateProductAreaModal />
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

                <ModalWrapper open={modals["sendInviteProduct"]}>
                    <SendInviteModal
                        isLoading={isSendInviteLoading}
                        sendInviteError={error}
                        members={productMembers}
                        onSend={onSend}
                        id={editingProduct?.id}
                        onCheckForOrgMember={(value, id) =>
                            inviteToProductCheck(value, id)
                        }
                        modal={"sendInviteProduct"}
                        inviteTo={editingProduct?.name}
                    />
                </ModalWrapper>

                <ModalWrapper open={modals["uploadProductImage"]}>
                    <UploadImageModal
                        isLoading={isProductImageLoading}
                        error={productImageError}
                        onSubmit={(image) => onUploadProductImage(image)}
                        modal={"uploadProductImage"}
                    />
                </ModalWrapper>
                <ModalWrapper open={modals["uploadProfileImage"]}>
                    <UploadImageModal
                        isLoading={isProfileImageLoading}
                        error={profileImageError}
                        onSubmit={(image) => onUploadProfileImage(image)}
                        modal={"uploadProfileImage"}
                    />
                </ModalWrapper>
                <main>
                    {!isOnWelcomePage && <DashboardSlider />}
                    <Toast />
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
