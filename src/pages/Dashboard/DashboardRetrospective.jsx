import * as echarts from "echarts/core"
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from "echarts/components"
import { LineChart } from "echarts/charts"
import { UniversalTransition } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"
import React, { useRef } from "react"
import {
    chartDropdownOptions,
    getAverage,
    getChartVisualIndicators,
    getGroupedByDate,
    getJumpToOptions,
    getTodayOrYesterdayDate,
    onJumpTo,
    pageSpinnerStyle,
    stringToDate,
} from "../../utils"
import { Tablist } from "../../components/Tablist"
import { ChartDropdown } from "../../components/ChartDropdown"
import { JumpToDropdown } from "../../components/JumpToDropdown"
import { NoDataRetrospective } from "../../components/NoDataPlaceholders/NoDataRetrospective"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { useQuery } from "react-query"
import { ErrorMessage } from "../../components/ErrorMessage"
import { Spinner } from "../../components/Spinner"
import { TeamFunctionIcon } from "../../components/TeamFunctionIcon"
import { Pill } from "../../components/Pill"
import { getRetrospective } from "../../api/retrospective"
import ToggleChartButton from "../../components/ToggleChartButton"
import { useDailyProgress } from "../../hooks/useDailyProgress"

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
])

export const DashboardRetrospective = () => {
    const { editingProduct } = useEditProductStore()

    const ref = useRef(null)
    const { chartVisible, setChartVisible, currTab, tabs, onTabChange } =
        useDailyProgress(ref)

    const {
        isLoading,
        error,
        data: retrospective,
    } = useQuery(
        ["retrospective", editingProduct.id],
        () => getRetrospective(editingProduct.id),
        {
            retry: false,
        }
    )

    if (retrospective?.length < 1) {
        return <NoDataRetrospective />
    }

    return isLoading ? (
        <Spinner style={pageSpinnerStyle} />
    ) : error ? (
        <ErrorMessage message={error.message} />
    ) : (
        <div
            className=" dashboard-retrospective"
            style={{
                paddingBottom: "4rem",
            }}
        >
            <span className="container flex justify-center mb">
                <ToggleChartButton
                    color={
                        getChartVisualIndicators(getAverage(currTab?.data))
                            .color.item
                    }
                    setChartVisible={setChartVisible}
                    chartVisible={chartVisible}
                />
            </span>
            {chartVisible && (
                <section className="container">
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
                    <div className="chart-footer mt flex ">
                        <Tablist
                            tabs={tabs}
                            onTabChange={onTabChange}
                            currTab={currTab}
                        />
                        <ChartDropdown options={chartDropdownOptions} />
                    </div>
                </section>
            )}
            <section
                className="flow"
                data-spacing="small"
            >
                {Object.values(
                    getGroupedByDate(
                        retrospective.map((i) => ({
                            ...i,
                            created_at: stringToDate(i.date),
                        }))
                    )
                ).map((blocker, idx) => (
                    <React.Fragment key={idx}>
                        <JumpToDropdown
                            onJumpTo={(timePeriod) =>
                                onJumpTo(
                                    timePeriod,
                                    retrospective.map((i) => ({
                                        ...i,
                                        created_at: stringToDate(i.date),
                                    }))
                                )
                            }
                            options={getJumpToOptions(
                                retrospective.map((i) => ({
                                    ...i,
                                    created_at: stringToDate(i.date),
                                }))
                            )}
                            placeholder={getTodayOrYesterdayDate(
                                blocker[0].created_at
                            )}
                        />
                        {blocker.map((item) => (
                            <RetrospectiveItem
                                id={blocker[0].created_at.setHours(0, 0, 0, 0)}
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </section>
        </div>
    )
}

const RetrospectiveItem = ({ item, id }) => {
    return (
        <div
            className={`impact-card hover-card-wrapper`}
            id={id}
        >
            <div className="impact-card__content container flow">
                <div className="flex ">
                    <p>{item.retrospective_summary}</p>
                </div>
                <div className="flex flex-wrap">
                    <div className={"impact-card__pfps flex"}>
                        {item.teams_affected.map((team) => (
                            <TeamFunctionIcon
                                color={team?.color}
                                team={team.function}
                                key={team.id}
                            />
                        ))}
                    </div>
                    <p>
                        {item.teams_affected.length}{" "}
                        {item.teams_affected.length === 1
                            ? "team was"
                            : "teams were"}{" "}
                        impacted.
                    </p>
                </div>
                {item.retrospective_type === "Could be better" ? (
                    <Pill
                        color={"couldBeBetter"}
                        text={"Could be better"}
                    />
                ) : (
                    <Pill
                        color={"wentWell"}
                        text={"Went well"}
                    />
                )}
            </div>
        </div>
    )
}
