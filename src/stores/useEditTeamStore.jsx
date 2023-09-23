import { create } from "zustand"
import { produce } from "immer"
import { teamFunctionOptions, timezoneOptions } from "./useCreateTeamStore"

export const useEditTeamStore = create((set) => ({
    editingTeam: {
        scrum_time: Date.now(),
        team_name: "",
        function: teamFunctionOptions[0],
        timezone: timezoneOptions[0],
    },
    setEditingTeam: (editingTeam) => set(() => ({ editingTeam })),
    onNumberChange: (e) => {
        const { name, value } = e.target
        set(
            produce((state) => {
                state.editingTeam[name] = value.replace(/\D/g, "")
            })
        )
    },
    onChange: (e) => {
        const { name, value, checked, type } = e.target
        set(
            produce((state) => {
                state.editingTeam[name] = type === "checkbox" ? checked : value
            })
        )
    },
    onSelectChange: (name, o) =>
        set(
            produce((state) => {
                state.editingTeam[name] = o
            })
        ),
}))
