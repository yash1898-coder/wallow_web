import { useStore } from "../../stores/useStore"
import { ModalHeader } from "./ModalHeader"
import { useRef, useState } from "react"
import { useInputValidation } from "../../hooks/useInputValidation"
import {
    teamFunctionOptions,
    // timezoneOptions,
} from "../../stores/useCreateTeamStore"
import { Select } from "../Select"
import { useEditTeamStore } from "../../stores/useEditTeamStore"
import { useMutation, useQueryClient } from "react-query"
import { editTeam } from "../../api/teams"
import { Spinner } from "../Spinner"
import { ErrorMessage } from "../ErrorMessage"

export const EditTeamModal = ({ team, id }) => {
    const { closeModal, openToast } = useStore()
    const { editingTeam, setEditingTeam } = useEditTeamStore()
    const [formData, setFormData] = useState(editingTeam)

    const queryClient = useQueryClient()
    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(
        () =>
            editTeam(id, {
                name: formData.team_name,
                function: formData.function.value,
                duration: 60,
                // scrum_time: editingTeam.scrum_time,
                // timezone: editingTeam.timezone.value,
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["teams", id])
                queryClient.invalidateQueries(["teams"])
                openToast({ text: "Team updated!" })
                setEditingTeam(formData)
                closeModal("editTeam")
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

    const onChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSelectChange = (name, o) => {
        setFormData((prev) => ({ ...prev, [name]: o }))
    }
    console.log(formData)
    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={`Edit ${team?.team_name} team`}
                modal={"editTeam"}
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
                    value={editingTeam.scrum_time}
                    onChange={(e) => {
                        onChange(e)
                        makeDailyStandupTimeValid()
                    }}
                    required
                    name="scrum_time"
                    className={`input ${
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
                    currOption={editingTeam.timezone}
                    onChange={(o) => onSelectChange("timezone", o)}
                /> */}

                <label
                    className="fs-400  label auth-form__submit-button"
                    htmlFor="team_name"
                >
                    Team name
                </label>
                <input
                    required
                    ref={teamNameRef}
                    value={formData.team_name}
                    onChange={(e) => {
                        onChange(e)
                        makeTeamNameValid()
                    }}
                    name="team_name"
                    className={`input ${teamNameInvalid ? "invalid" : ""}`}
                    type="text"
                    id="team_name"
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
                    onClick={() => closeModal("editTeam")}
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
                    Save
                </button>
            </div>
        </dialog>
    )
}
