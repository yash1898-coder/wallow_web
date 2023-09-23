import { useStore } from "../../stores/useStore"
import { ModalHeader } from "./ModalHeader"
import { useRef } from "react"
import { useInputValidation } from "../../hooks/useInputValidation"
import {
    teamFunctionOptions,
    // timezoneOptions,
    useCreateTeamStore,
} from "../../stores/useCreateTeamStore"
import { Select } from "../Select"
import { useMutation, useQueryClient } from "react-query"
import { createTeam } from "../../api/teams"
import { ErrorMessage } from "../ErrorMessage"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { Spinner } from "../Spinner"
import { useEditProductAreaStore } from "../../stores/useEditProductAreaStore"
import { useEditTeamStore } from "../../stores/useEditTeamStore"
import { useNavigate } from "react-router-dom"

export const CreateTeamModal = () => {
    const { closeModal, openToast } = useStore()
    const { editingProductArea } = useEditProductAreaStore()
    const { setEditingTeam } = useEditTeamStore()
    const { editingProduct } = useEditProductStore()
    const { formData, onChange, onSelectChange, resetFormData } =
        useCreateTeamStore()

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(
        () =>
            createTeam(editingProduct.id, {
                name: formData.name,
                function: formData.function.value,
                duration: 60,
                // scrum_time: formData.scrum_time,
                // timezone: formData.timezone.value,
            }),
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries(["teams"])
                queryClient.invalidateQueries([
                    "productAreas",
                    editingProductArea.id,
                ])
                setEditingTeam(res)
                navigate(`/dashboard/teams/${res.team_id}`)
                openToast({ text: "Created a new team!" })
                closeModal("createTeam")
                resetFormData()
            },
        }
    )

    // const dailyStandupTimeRef = useRef()
    const teamNameRef = useRef()

    // const {
    //     invalid: dailyStandupTimeInvalid,
    //     makeValid: makeDailyStandupTimeValid,
    //     checkValidity: checkDailyStandupTimeValidity,
    // } = useInputValidation(dailyStandupTimeRef)

    const {
        invalid: teamNameInvalid,
        makeValid: makeTeamNameValid,
        checkValidity: checkTeamNameValidity,
    } = useInputValidation(teamNameRef)

    const ref = useRef()

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={"Create team"}
                modal={"createTeam"}
            />
            <form
                ref={ref}
                id="create-team-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}
                className="modal__content modal-form"
            >
                {/* <label
                    className="fs-400  label auth-form__submit-button"
                    htmlFor="scrum_time"
                >
                    Request updates everyday at
                </label>
                <input
                    ref={dailyStandupTimeRef}
                    value={formData.scrum_time}
                    onChange={(e) => {
                        onChange(e)
                        makeDailyStandupTimeValid()
                    }}
                    required
                    name="scrum_time"
                    className={`input  ${
                        dailyStandupTimeInvalid ? "invalid" : ""
                    }`}
                    type="time"
                    id="scrum_time"
                />

                <p
                    className="fs-400  label auth-form__submit-button"
                    htmlFor="duration"
                >
                    Team Timezone
                </p>
                <Select
                    options={timezoneOptions}
                    currOption={formData.timezone}
                    onChange={(o) => onSelectChange("timezone", o)}
                /> */}

                <label
                    className="fs-400  label auth-form__submit-button"
                    htmlFor="name"
                >
                    Team name
                </label>
                <input
                    required
                    ref={teamNameRef}
                    value={formData.name}
                    onChange={(e) => {
                        onChange(e)
                        makeTeamNameValid()
                    }}
                    name="name"
                    className={`input ${teamNameInvalid ? "invalid" : ""}`}
                    type="text"
                    id="name"
                    placeholder="Enter team name"
                />
                <p className=" label">Function</p>
                <Select
                    options={teamFunctionOptions}
                    currOption={formData.function}
                    onChange={(o) => onSelectChange("function", o)}
                />
            </form>
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer">
                <button
                    onClick={() => closeModal("createTeam")}
                    className="button button--inverted"
                >
                    Cancel
                </button>
                <button
                    disabled={isLoading}
                    onClick={() => {
                        // checkDailyStandupTimeValidity()
                        checkTeamNameValidity()
                    }}
                    form="create-team-form"
                    className="modal__button button button--icon-label-inverted"
                >
                    {isLoading && <Spinner />}
                    Create
                </button>
            </div>
        </dialog>
    )
}
