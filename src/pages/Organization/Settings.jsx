import { useInputValidation } from "../../hooks/useInputValidation"
import { useEffect, useRef, useState } from "react"
import { useOrganization } from "../../hooks/useOrganization"
import { Spinner } from "../../components/Spinner"
import { pageSpinnerStyle } from "../../utils"
import { ErrorMessage } from "../../components/ErrorMessage"
import { useMutation, useQueryClient } from "react-query"
import { updateOrganizationDetails } from "../../api/organization"
import { useStore } from "../../stores/useStore"
import { useErrorToast } from "../../hooks/useErrorToast"
import { FileInput } from "../../components/FileInput"

export const Settings = () => {
    const { openToast } = useStore()
    const { organizationError, organizationLoading, organization } =
        useOrganization()

    const nameRef = useRef()

    const queryClient = useQueryClient()

    const [img, setImg] = useState(undefined)
    const [imgForFormData, setImgForFormData] = useState(undefined)

    const {
        invalid: nameInvalid,
        makeValid: makeNameValid,
        checkValidity: checkNameValidity,
    } = useInputValidation(nameRef)

    const {
        isLoading: updateLoading,
        error: updateError,
        mutate: onSubmit,
    } = useMutation((data) => updateOrganizationDetails(data), {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["organization", "details"])
            openToast({ text: "Details updated!" })
            setImg(res.profile_image)
        },
    })

    useEffect(() => {
        if (organization?.profile_image) {
            setImg(organization.profile_image)
        }
    }, [organization?.profile_image])

    useErrorToast(updateError)

    const onChange = (e) => {
        const { name, value } = e.target

        queryClient.setQueryData(["organization", "details"], (prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const onImgChange = (e) => {
        const { files } = e.target
        setImg(URL.createObjectURL(files[0]))
        setImgForFormData(files[0])
        makeNameValid("name")
    }

    return (
        <div className="container">
            <h1 className="fs-700 fw-700 mb">Organization settings</h1>
            {organizationLoading ? (
                <Spinner style={pageSpinnerStyle} />
            ) : organizationError ? (
                <ErrorMessage message={organizationError.message} />
            ) : (
                <form
                    style={{ maxWidth: "500px" }}
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (!img) {
                            onSubmit({
                                ...organization,
                                profile_image: null,
                            })
                        } else {
                            onSubmit({
                                ...organization,
                                profile_image: imgForFormData,
                                imageDeleted: false,
                            })
                        }
                    }}
                >
                    <div
                        className="flow mt"
                        data-spacing="small"
                    >
                        <label
                            className="fs-400 label"
                            htmlFor="name"
                        >
                            Organization name
                        </label>
                        <p className="">
                            Human-friendly label for your organization, shown in
                            user interfaces
                        </p>
                        <input
                            ref={nameRef}
                            value={
                                organization?.name === null
                                    ? undefined
                                    : organization?.name
                            }
                            onChange={(e) => {
                                onChange(e)
                                makeNameValid()
                            }}
                            required={!img}
                            name="name"
                            className={`input ${
                                !img && nameInvalid ? "invalid" : ""
                            }`}
                            type="text"
                            id="name"
                            placeholder="Enter organization name"
                        />
                    </div>

                    <p className="or-divider ">OR</p>

                    <div
                        className={`flow `}
                        data-spacing="small"
                    >
                        <label
                            className="fs-400 label"
                            style={{ margin: 0 }}
                            htmlFor="name"
                        >
                            Company logo
                        </label>
                        <p className="">
                            Upload your company logo to display instead of the
                            organization's name
                        </p>
                        <FileInput
                            required={false}
                            file={img}
                            onChange={onImgChange}
                        />
                        <button
                            type="button"
                            className="button"
                            disabled={!img}
                            onClick={() => {
                                setImg(null)
                                setImgForFormData(null)
                            }}
                        >
                            Clear
                        </button>
                    </div>
                    <div
                        className="flow mt"
                        data-spacing="small"
                    >
                        <label
                            className="fs-400 label"
                            htmlFor="id"
                        >
                            Organization ID
                        </label>
                        <p className="">Identifier for this organization.</p>
                        <input
                            disabled
                            defaultValue={organization?.org_id}
                            name="id"
                            className={`input`}
                            type="text"
                            id="id"
                            placeholder="Enter organization ID"
                        />
                    </div>

                    <button
                        disabled={updateLoading}
                        className="button mt"
                        onClick={() => {
                            checkNameValidity()
                        }}
                    >
                        {updateLoading && <Spinner />}
                        Save
                    </button>
                </form>
            )}
        </div>
    )
}
