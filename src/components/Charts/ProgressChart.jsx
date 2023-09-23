import { forwardRef } from "react"
import {
    chartDropdownOptions,
    getAverage,
    getChartVisualIndicators,
} from "../../utils"
import { ChartDropdown } from "../ChartDropdown"
import { Tablist } from "../Tablist"

// eslint-disable-next-line react/display-name
export const ProgressChart = forwardRef(
    ({ currTab, tabs, onTabChange }, ref) => {
        return (
            <section>
                <div className="container">
                    <div
                        className="flex mt"
                        style={{
                            color: getChartVisualIndicators(
                                getAverage(currTab?.data)
                            ).color.item,
                            "--gap": ".35rem",
                        }}
                    >
                        {
                            getChartVisualIndicators(getAverage(currTab?.data))
                                .icon
                        }
                        <h2 className=" fs-500 fw-700">
                            <span style={{ marginRight: ".5rem" }}>
                                {getAverage(currTab?.data)}
                            </span>
                            {currTab?.subtitle}
                        </h2>
                    </div>
                    <p className="fs-200 ">Delivery Sentiment Analysis</p>
                    <div
                        ref={ref}
                        className="dashboard-progress__chart"
                    />
                </div>
                <div className="container flex chart-footer mt">
                    <Tablist
                        // tabs={tabs.filter(
                        //     (tab) =>
                        //         !tab.data.every(
                        //             (team) => team.xAxisData.length < 1
                        //         )
                        // )}
                        tabs={tabs}
                        onTabChange={onTabChange}
                        currTab={currTab}
                    />
                    <ChartDropdown
                        colors={false}
                        options={chartDropdownOptions}
                    />
                </div>
            </section>
        )
    }
)
