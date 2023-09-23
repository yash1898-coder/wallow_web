import { useState } from "react"
import { ModalHeader } from "./ModalHeader"
import { useSearch } from "../../hooks/useSearch"
import { SearchInput } from "../SearchInput"
import { useStore } from "../../stores/useStore"
import { TeamFunctionIcon } from "../TeamFunctionIcon"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { useMutation, useQueryClient } from "react-query"
import { deleteProductAreaTeam } from "../../api/productAreas"
import { Spinner } from "../Spinner"
import { useErrorToast } from "../../hooks/useErrorToast"

export const TeamsModal = ({ teams, productAreaId }) => {
    const { openModal } = useStore()
    const { editingProduct } = useEditProductStore()
    const [clickedRemoveButton, setClickedRemoveButton] = useState(undefined)
    const [q, setQ] = useState("")
    const search = useSearch(q, ["name"])

    const queryClient = useQueryClient()
    const {
        isLoading,
        error,
        mutate: onRemove,
    } = useMutation((teamId) => deleteProductAreaTeam(productAreaId, teamId), {
        onSuccess: () => {
            queryClient.invalidateQueries(["productAreas", productAreaId])
        },
    })

    useErrorToast(error)

    return (
        <dialog
            open
            className="modal teams-modal modal--form"
        >
            <ModalHeader
                title={`${editingProduct.name} teams`}
                modal={"teams"}
            />
            <div className="modal__content modal__content--even-cols">
                <SearchInput
                    value={q}
                    placeholder={"Find teams"}
                    onChange={(e) => setQ(e.target.value)}
                />
            </div>
            <ul
                className="flow mt modal-people-list"
                style={{ "--margin": ".8rem" }}
            >
                {search(teams).length === 0 ? (
                    <p>Nothing found.</p>
                ) : (
                    search(teams).map((t, idx) => (
                        <li
                            className="flex justify-between"
                            key={idx}
                        >
                            <div className="flex">
                                <TeamFunctionIcon team={t.function} />
                                {t.name}
                            </div>
                            {t.accountType !== "Owner" && (
                                <button
                                    className="button-reset text-purple-700 button-hover-underline "
                                    disabled={
                                        isLoading &&
                                        t.id === clickedRemoveButton
                                    }
                                    onClick={() => {
                                        onRemove(t.id)
                                        setClickedRemoveButton(t.id)
                                    }}
                                >
                                    {isLoading &&
                                        t.id === clickedRemoveButton && (
                                            <Spinner
                                                size="12px"
                                                color="var(--clr-purple-700)"
                                            />
                                        )}
                                    Remove
                                </button>
                            )}
                        </li>
                    ))
                )}
            </ul>
            <div
                className="modal__footer"
                style={{ justifyContent: "flex-end" }}
            >
                <button
                    className="button-reset text-purple-700 "
                    onClick={() => openModal("addTeams")}
                >
                    Add teams
                </button>
            </div>
        </dialog>
    )
}
