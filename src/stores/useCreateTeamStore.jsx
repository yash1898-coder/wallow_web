import { create } from "zustand"
import { produce } from "immer"
import { TeamFunctionIcon } from "../components/TeamFunctionIcon"

export const teamFunctionOptions = [
    {
        value: "Design",
        icon: <TeamFunctionIcon team={"Design"} />,
    },
    {
        value: "Engineering",
        icon: <TeamFunctionIcon team={"Engineering"} />,
    },
    {
        value: "Product",
        icon: <TeamFunctionIcon team={"Product"} />,
    },
    {
        value: "Marketing",
        icon: <TeamFunctionIcon team={"Marketing"} />,
    },
    {
        value: "Operations",
        icon: <TeamFunctionIcon team={"Operations"} />,
    },
    {
        value: "HR",
        icon: <TeamFunctionIcon team={"HR"} />,
    },
    {
        value: "Finance",
        icon: <TeamFunctionIcon team={"Finance"} />,
    },
]

export const timezoneOptions = [
    { value: "Asia/Kolkata", label: "India Standard Time (IST, GMT+5:30)" },
    {
        value: "Europe/Kiev",
        label: "Eastern European Summer Time (EEST, GMT+3:00)",
    },
    { value: "US/Alaska", label: "Alaska Standard Time (AKST, GMT-9:00)" },
    {
        value: "US/Aleutian",
        label: "Hawaii-Aleutian Standard Time (HAST, GMT-10:00)",
    },
    { value: "US/Arizona", label: "Mountain Standard Time (MST, GMT-7:00)" },
    { value: "US/Central", label: "Central Standard Time (CST, GMT-6:00)" },
    {
        value: "US/East-Indiana",
        label: "Eastern Standard Time (EST, GMT-5:00)",
    },
    { value: "US/Hawaii", label: "Hawaii Standard Time (HST, GMT-10:00)" },
    {
        value: "US/Indiana-Starke",
        label: "Central Standard Time (CST, GMT-6:00)",
    },
    { value: "US/Mountain", label: "Mountain Standard Time (MST, GMT-7:00)" },
    { value: "US/Pacific", label: "Pacific Standard Time (PST, GMT-8:00)" },
    { value: "US/Samoa", label: "Samoa Standard Time (SST, GMT-11:00)" },
]

export const useCreateTeamStore = create((set) => ({
    formData: {
        scrum_time: "16:45",
        name: "",
        function: teamFunctionOptions[0],
        timezone: timezoneOptions[0],
    },
    onNumberChange: (e) => {
        const { name, value } = e.target
        set(
            produce((state) => {
                state.formData[name] = value.replace(/\D/g, "")
            })
        )
    },
    onChange: (e) => {
        const { name, value, checked, type } = e.target
        set(
            produce((state) => {
                state.formData[name] = type === "checkbox" ? checked : value
            })
        )
    },
    resetFormData: () => {
        set(() => ({
            formData: {
                scrum_time: Date.now(),
                duration: { value: "00:15:00" },
                name: "",
                function: teamFunctionOptions[0],
                timezone: timezoneOptions[0],
            },
        }))
    },
    onSelectChange: (name, o) =>
        set(
            produce((state) => {
                state.formData[name] = o
            })
        ),
}))
