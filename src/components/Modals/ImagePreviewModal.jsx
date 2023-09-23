import { useImagePreviewStore } from "../../stores/useImagePreviewStore"
import { ModalWrapper } from "./ModalWrapper"
import { ReactComponent as Close } from "../../assets/close.svg"
import { useStore } from "../../stores/useStore"

export const ImagePreviewModal = ({ open }) => {
    const { currentImage } = useImagePreviewStore()
    const { closeModal } = useStore()

    return (
        <ModalWrapper open={open}>
            <dialog
                open
                className="image-preview-modal"
            >
                <div className="image-preview-modal__content">
                    <button
                        onClick={() => closeModal("imagePreview")}
                        className="image-preview-modal__close-button modal__close-button"
                    >
                        <Close fill="#fff" />
                        <span className="sr-only">Close modal</span>
                    </button>
                    <img
                        aria-hidden="true"
                        className="image-preview-modal__blurred-img"
                        src={currentImage}
                        alt="preview image"
                    />
                    <img
                        className="image-preview-modal__img"
                        src={currentImage}
                        alt="preview image"
                    />
                </div>
            </dialog>
        </ModalWrapper>
    )
}
