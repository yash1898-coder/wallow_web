import { useMutation, useQuery, useQueryClient } from "react-query"
import { useSearch } from "../../hooks/useSearch"
import { useStore } from "../../stores/useStore"
import { SearchList } from "../SearchList"
import { TeamFunctionIcon } from "../TeamFunctionIcon"
import { ModalHeader } from "./ModalHeader"
import { useRef, useState } from "react"
import { addProductAreaTeam } from "../../api/productAreas"
import { getTeams } from "../../api/teams"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { Spinner } from "../Spinner"
import { ErrorMessage } from "../ErrorMessage"

export const AddTeamsModal = ({ existingTeams, inviteTo, id }) => {
    const { editingProduct } = useEditProductStore()
    const { closeModal, openToast } = useStore()
    const [options, setOptions] = useState([])

    const queryClient = useQueryClient()
    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation((teamId) => addProductAreaTeam(id, teamId), {
        onSuccess: () => {
            queryClient.invalidateQueries(["productAreas", id])
            openToast({ text: "Team(s) added!" })
            closeModal("addTeams")
        },
    })

    const { isLoading: teamsLoading } = useQuery(
        ["teams"],
        () => getTeams(editingProduct.id),
        {
            retry: false,
            onSuccess: (teams) => {
                setOptions(
                    teams
                        .map((t) => ({
                            ...t,
                            icon: (
                                <TeamFunctionIcon
                                    color={t.color}
                                    team={t.function}
                                />
                            ),
                            selected: false,
                        }))
                        .filter(
                            (o) => !existingTeams.some((m) => m.id === o.id)
                        )
                )
            },
        }
    )

    const onCheckboxChange = (e) => {
        setOptions((prev) =>
            prev.map((o) =>
                o.id.toString() === e.target.name
                    ? { ...o, selected: e.target.checked }
                    : o
            )
        )
    }

    const [q, setQ] = useState("")
    const search = useSearch(q, ["name"])
    const toRef = useRef()

    return (
        <dialog
            open
            className="modal modal--form"
        >
            <ModalHeader
                title={`${inviteTo} teams `}
                modal={"addTeams"}
            />
            <div className="modal__content">
                <input
                    ref={toRef}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    required
                    name="to"
                    className={`input`}
                    type="email"
                    id="to"
                    placeholder={"Team name"}
                />
                {teamsLoading ? (
                    <Spinner style={{ marginTop: "4rem" }} />
                ) : (
                    <SearchList
                        teams={true}
                        options={search(options)}
                        onChange={onCheckboxChange}
                    />
                )}
            </div>
            {error && <ErrorMessage message={error.message} />}
            <div className="modal__footer">
                <button
                    style={{ marginLeft: "auto" }}
                    onClick={() => {
                        const selectedTeams = options.filter((o) => o.selected)
                        selectedTeams.forEach((t) => onSubmit(t.id))
                    }}
                    disabled={!options.some((o) => o.selected) || isLoading}
                    form="invite-modal"
                    className="modal__button button button--icon-label-inverted"
                >
                    {isLoading && <Spinner />}
                    Add
                </button>
            </div>
        </dialog>
    )
}
