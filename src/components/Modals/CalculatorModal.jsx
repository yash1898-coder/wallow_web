import { useEffect, useState } from "react"
import { ModalHeader } from "./ModalHeader"
import { formatCurrency } from "../../utils"
import { useStore } from "../../stores/useStore"

export const CalculatorModal = () => {
    const { plan } = useStore()
    const [numberOfTeams, setNumberOfTeams] = useState("")
    const [duration, setDuration] = useState("")
    const [hourlyRate, setHourlyRate] = useState("")
    const [membersPerTeam, setMembersPerTeam] = useState("")
    const [costPerYear, setCostPerYear] = useState(0)
    const [savingsPerYear, setSavingsPerYear] = useState(0)

    const onDurationChange = (e) => {
        const { value } = e.target
        const numericValue = value.replace(/\D/g, "")
        const limitedValue =
            numericValue === "" ? "" : Math.min(parseInt(numericValue, 0), 60)
        setDuration(limitedValue.toString())
    }

    useEffect(() => {
        if (numberOfTeams && duration && hourlyRate && membersPerTeam) {
            setCostPerYear(plan * +membersPerTeam * +numberOfTeams * 12)
            setSavingsPerYear(
                +numberOfTeams *
                    +hourlyRate *
                    (+duration / 60) *
                    +membersPerTeam *
                    260
            )
        }
    }, [membersPerTeam, duration, hourlyRate, numberOfTeams, plan])

    return (
        <dialog
            open
            className="modal modal--calculator"
        >
            <ModalHeader
                title={`Estimate your savings`}
                modal={"calculator"}
            />
            <div
                className="modal__content modal--calculator__content mt "
                style={{ "--margin": ".75rem" }}
            >
                <p>See the potential Wallow could make for your business. </p>
                <div>
                    <label
                        htmlFor="number of teams"
                        className="label"
                    >
                        Number of teams
                    </label>
                    <input
                        placeholder="Number of teams"
                        className="input"
                        type="text"
                        value={numberOfTeams}
                        onChange={(e) =>
                            setNumberOfTeams(e.target.value.replace(/\D/g, ""))
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="number of teams"
                        className="label"
                    >
                        Average duration of sync-up meetings
                    </label>
                    <div className="flex">
                        <span>Mins.</span>
                        <input
                            placeholder="Average duration (mins)"
                            className="input"
                            type="text"
                            value={duration}
                            onChange={onDurationChange}
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="number of teams"
                        className="label"
                    >
                        Average hourly rate per team member
                    </label>
                    <div className="flex">
                        <span className="fs-600 fw-500">$</span>
                        <input
                            placeholder="Hourly rate ($)"
                            className="input"
                            type="text"
                            value={hourlyRate}
                            onChange={(e) =>
                                setHourlyRate(e.target.value.replace(/\D/g, ""))
                            }
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="number of teams"
                        className="label"
                    >
                        Average number of members per team
                    </label>
                    <input
                        placeholder="Average members per team"
                        className="input"
                        type="text"
                        value={membersPerTeam}
                        onChange={(e) =>
                            setMembersPerTeam(e.target.value.replace(/\D/g, ""))
                        }
                    />
                </div>
                <div className="mt">
                    <p className="fw-500 mt flex justify-between flex-wrap">
                        Savings per year:{" "}
                        <span className="fs-600">
                            {formatCurrency(savingsPerYear)}
                        </span>
                    </p>
                    <p className="fw-500 mt flex justify-between flex-wrap">
                        Wallow cost per year:{" "}
                        <span className="fs-600 ">
                            {formatCurrency(costPerYear)}
                        </span>
                    </p>
                </div>
                <button
                    onClick={() => {
                        setNumberOfTeams("")
                        setDuration("")
                        setHourlyRate("")
                        setMembersPerTeam("")
                        setCostPerYear(0)
                        setSavingsPerYear(0)
                    }}
                    className="button"
                >
                    Reset
                </button>
            </div>
        </dialog>
    )
}
