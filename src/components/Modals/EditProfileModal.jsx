import { useStore } from "../../stores/useStore"
import { ModalHeader } from "./ModalHeader"
import { useEffect, useRef, useState } from "react"
import { useInputValidation } from "../../hooks/useInputValidation"
import { useEditProfileStore } from "../../stores/useEditProfileStore"
import { useMutation, useQueryClient } from "react-query"
import { updateAccount } from "../../api/accounts"
import { ErrorMessage } from "../ErrorMessage"
import { Spinner } from "../Spinner"
import { FileInput } from "../FileInput"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { useAuthStore } from "../../stores/useAuthStore"

export const EditProfileModal = () => {
    const { closeModal, openToast } = useStore()
    const { setUser, user } = useAuthStore()
    const { editingUser, onChange, setEditingUser } = useEditProfileStore()
    const { editingProduct } = useEditProductStore()
    const [img, setImg] = useState(undefined)
    const [imgForFormData, setImgForFormData] = useState(undefined)

    useEffect(() => {
        setEditingUser(user)
    }, [])

    const onImgChange = (e) => {
        const { files } = e.target
        setImg(URL.createObjectURL(files[0]))
        setImgForFormData(files[0])
    }
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const {
        invalid: firstNameInvalid,
        makeValid: makeFirstNameValid,
        checkValidity: checkFirstNameValidity,
    } = useInputValidation(firstNameRef)
    const {
        invalid: lastNameInvalid,
        makeValid: makeLastNameValid,
        checkValidity: checkLastNameValidity,
    } = useInputValidation(lastNameRef)

    const {
        invalid: emailInvalid,
        makeValid: makeEmailValid,
        checkValidity: checkEmailValidity,
    } = useInputValidation(emailRef)
    const ref = useRef()

    const queryClient = useQueryClient()
    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(
        () => updateAccount({ ...editingUser, profile_image: imgForFormData }),
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries(["accounts"])
                queryClient.invalidateQueries([
                    "products",
                    "members",
                    editingProduct?.id,
                ])
                openToast({ text: "Profile updated!" })
                closeModal("editProfile")
                setUser({ ...res, role: user.role })
            },
        }
    )
    console.log(user)
    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={"Edit profile"}
                modal={"editProfile"}
            />
            <form
                ref={ref}
                id="edit-profile-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}
                className="modal__content modal-form edit-profile-form"
            >
                <label
                    className="fs-400  label"
                    htmlFor="first_name"
                >
                    First name
                </label>
                <input
                    ref={firstNameRef}
                    value={editingUser?.first_name}
                    onChange={(e) => {
                        onChange(e)
                        makeFirstNameValid()
                    }}
                    required
                    name="first_name"
                    className={`input  ${firstNameInvalid ? "invalid" : ""}`}
                    type="text"
                    id="first_name"
                    placeholder="Enter first name"
                />

                <label
                    className="fs-400  label"
                    htmlFor="last_name"
                >
                    Last name
                </label>
                <input
                    ref={lastNameRef}
                    value={editingUser?.last_name}
                    onChange={(e) => {
                        onChange(e)
                        makeLastNameValid()
                    }}
                    name="last_name"
                    className={`input ${lastNameInvalid ? "invalid" : ""}`}
                    type="text"
                    id="last_name"
                    placeholder="Enter last name"
                />

                <label
                    className="fs-400  label"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    disabled
                    ref={emailRef}
                    value={editingUser?.email}
                    onChange={(e) => {
                        onChange(e)
                        makeEmailValid()
                    }}
                    name="email"
                    className={`input ${emailInvalid ? "invalid" : ""}`}
                    type="text"
                    id="email"
                    placeholder="Enter display name"
                />
                <small className="fs-200  ">
                    Email is set by the organization and can't be changed.
                </small>

                <label
                    className="fs-400  label"
                    htmlFor="img"
                >
                    Upload profile image
                </label>
                <FileInput
                    required={false}
                    file={img}
                    onChange={onImgChange}
                />
                <button
                    type="button"
                    className="button mt"
                    disabled={!img}
                    style={{ alignSelf: "center" }}
                    onClick={() => setImg(undefined)}
                >
                    Clear
                </button>
            </form>
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer">
                <button
                    onClick={() => closeModal("editProfile")}
                    className="button button--inverted"
                >
                    Cancel
                </button>
                <button
                    disabled={isLoading}
                    onClick={() => {
                        checkFirstNameValidity()
                        checkLastNameValidity()
                        checkEmailValidity()
                    }}
                    form="edit-profile-form"
                    className="modal__button button button--icon-label-inverted"
                >
                    {isLoading && <Spinner />}
                    Save
                </button>
            </div>
        </dialog>
    )
}
