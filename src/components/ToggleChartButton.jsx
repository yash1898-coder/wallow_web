import { ReactComponent as ChartIcon } from "../assets/dashboard/chart.svg"

export default function ToggleChartButton({
    chartVisible,
    setChartVisible,
    color,
}) {
    return (
        <button
            onClick={() => setChartVisible((prev) => !prev)}
            className={`icon-button icon-button--large`}
            aria-expanded={chartVisible}
        >
            <ChartIcon fill={color} />
        </button>
    )
}
