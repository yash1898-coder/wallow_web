import { useState } from "react"
import img from "../assets/dashboard/chartDropdown.png"
import { CircleIndicator } from "./CircleIndicator"

export const ChartDropdown = ({ options }) => {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="chart-dropdown"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                className="button-reset chart-dropdown__toggle"
            >
                <img
                    src={img}
                    alt=""
                />
            </button>
            <ul
                data-visible={open}
                className="chart-dropdown__options"
            >
                {options.map((option) => (
                    <li
                        className="chart-dropdown__option"
                        key={option.title}
                    >
                        <CircleIndicator color={option.color} />
                        <span>
                            {option.range} <br />
                            {option.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
