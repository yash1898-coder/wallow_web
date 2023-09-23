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
import { useQuery } from "react-query"
import { getTeamWithChart, getTeams } from "../../api/teams"
import { TeamFunctionIcon } from "../../components/TeamFunctionIcon"
import { timezoneOptions } from "../../stores/useCreateTeamStore"
import { useEffect, useRef, useState } from "react"
import {
    chartDropdownOptions,
    getChartVisualIndicators,
    onChartResize,
    pageSpinnerStyle,
} from "../../utils"
import { useEditTeamStore } from "../../stores/useEditTeamStore"
import { Tablist } from "../../components/Tablist"
import { ChartDropdown } from "../../components/ChartDropdown"
import { useTabs } from "../../hooks/useTabs"
import { Spinner } from "../../components/Spinner"
import { Select } from "../../components/Select"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { NoDataSentiment } from "../../components/NoDataPlaceholders/NoDataSentiment"

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

export const DashboardSentiment = () => {
    const { setEditingTeam, editingTeam } = useEditTeamStore()
    const { editingProduct } = useEditProductStore()

    const { isLoading, data: team } = useQuery(
        ["teams", editingTeam?.id],
        () => getTeamWithChart(editingTeam?.id),
        {
            retry: false,
            refetchOnWindowFocus: true,
            onSuccess: (team) => {
                // setEditingTeam({
                //     ...team,
                //     label: team.team_name,
                //     value: team.team_name,
                //     id: team.team_id,
                //     duration: { value: team.duration },
                //     function: {
                //         value: team.function,
                //         icon: (
                //             <TeamFunctionIcon
                //                 team={team.function}
                //                 color={team.color}
                //             />
                //         ),
                //     },
                //     timezone: {
                //         value: team.timezone,
                //         label: timezoneOptions?.find(
                //             (t) => t.value === team.timezone
                //         )?.label,
                //     },
                // })

                const { team_history } = team
                if (team_history) {
                    setTabs((prev) =>
                        prev.map((item) => {
                            return {
                                ...item,
                                data: {
                                    ...item.data,
                                    xAxisData: team_history[item.title].map(
                                        (i) => i.created_at
                                    ),
                                    series: [
                                        team_history[item.title].map(
                                            (i) => i.score
                                        ),
                                    ],
                                },
                            }
                        })
                    )
                    if (currTab?.data.length < 1) {
                        setCurrTab(() => ({
                            title: "1W",
                            subtitle: "Past week",
                            data: {
                                xAxisData: team_history["1W"].map(
                                    (i) => i.created_at
                                ),
                                series: [
                                    team_history["1W"].map((i) => i.score),
                                ],
                            },
                        }))
                    }
                }
            },
        }
    )

    const [tabs, setTabs] = useState([
        {
            title: "1W",
            subtitle: "Past week",
            data: [],
        },
        {
            title: "2W",
            subtitle: "Past two weeks",
            data: [],
        },
        {
            title: "1M",
            subtitle: "Past month",
            data: [],
        },
        {
            title: "2M",
            subtitle: "Past two months",
            data: [],
        },
        {
            title: "3M",
            subtitle: "Past three months",
            data: [],
        },
        {
            title: "6M",
            subtitle: "Past six months",
            data: [],
        },
        {
            title: "1Y",
            subtitle: "Past year",
            data: [],
        },
    ])

    const getAverageScore = () => {
        if (team?.team_history) {
            const scores = team.team_history[currTab?.title].map((i) => i.score)
            if (scores.length === 0) {
                return "No data for"
            } else {
                const total = scores.reduce((a, b) => a + b, 0)
                return +(total / scores.length).toFixed(2)
            }
        }
    }

    const ref = useRef(null)

    const { currTab, onTabChange, setCurrTab } = useTabs(tabs)
    const config = {
        textStyle: { fontFamily: "Inter" },
        title: {
            show: false,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        grid: {
            left: "1%",
            right: "4%",
            top: "3%",
            bottom: "0",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: currTab?.data?.xAxisData,
        },
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                showSymbol: false,
                smooth: true,
                name: "Delivery Sentiment Analysis",
                type: "line",
                areaStyle: {
                    opacity: 100,
                    color: getChartVisualIndicators(getAverageScore()).color
                        .item,
                },
                itemStyle: {
                    color: getChartVisualIndicators(getAverageScore()).color
                        .item,
                },
                emphasis: {
                    focus: "series",
                },
                data: currTab?.data?.series ? currTab.data.series[0] : [],
            },
        ],
    }

    useEffect(() => {
        let chart
        if (!isLoading && editingTeam?.id) {
            chart = echarts.init(ref.current)
            chart.setOption(config)

            window.addEventListener("resize", () => onChartResize(chart))
        }

        return () => {
            window.removeEventListener("resize", () => onChartResize(chart))
        }
    }, [config, currTab, isLoading, currTab?.data.length, editingTeam])

    const { data: teamList } = useQuery(
        ["teams", editingProduct.id],
        () => getTeams(editingProduct.id),
        {
            retry: false,
        }
    )

    useQuery(
        ["teams", editingProduct?.id],
        () => getTeams(editingProduct?.id),
        {
            retry: false,
            onSuccess: (team) => {
                const newTeam = team[0]
                if (!editingTeam?.id) {
                    setEditingTeam({
                        ...newTeam,
                        label: newTeam.team_name,
                        value: newTeam.team_name,
                        duration: { value: newTeam.duration },
                        function: {
                            value: newTeam.function,
                            icon: (
                                <TeamFunctionIcon
                                    team={newTeam.function}
                                    color={newTeam.color}
                                />
                            ),
                        },
                        timezone: {
                            value: newTeam.timezone,
                            label: timezoneOptions?.find(
                                (t) => t.value === newTeam.timezone
                            )?.label,
                        },
                    })
                }
            },
        }
    )

    if (!editingTeam?.id) return <NoDataSentiment />

    return (
        <>
            <section
                style={{
                    paddingBlock: "2rem",
                }}
            >
                {isLoading ? (
                    <Spinner style={pageSpinnerStyle} />
                ) : (
                    <div className="container">
                        <div className="flex justify-between flex-wrap">
                            <h1 className="fs-700 fw-700">
                                {team?.team_name} delivery sentiment
                            </h1>
                            <div style={{ maxWidth: 240 }}>
                                <Select
                                    placeholder="Switch team"
                                    currOption={editingTeam}
                                    onChange={(o) => setEditingTeam(o)}
                                    options={
                                        teamList?.map((team) => ({
                                            ...team,
                                            label: team.name,
                                            value: team.name,
                                        })) ?? []
                                    }
                                />
                            </div>
                        </div>
                        <div
                            className="flex mt"
                            style={{
                                color: getChartVisualIndicators(
                                    getAverageScore()
                                ).color.item,
                                "--gap": ".35rem",
                            }}
                        >
                            {getChartVisualIndicators(getAverageScore()).icon}
                            <h2 className=" fs-500 fw-700">
                                <span style={{ marginRight: ".5rem" }}>
                                    {getAverageScore()}
                                </span>
                                {currTab?.subtitle}
                            </h2>
                        </div>
                        <p className="fs-200 ">Delivery Sentiment Analysis</p>
                        <div
                            ref={ref}
                            className="dashboard-progress__chart"
                        />
                        <div className="flex chart-footer mt">
                            <Tablist
                                tabs={tabs}
                                onTabChange={onTabChange}
                                currTab={currTab}
                            />
                            <ChartDropdown options={chartDropdownOptions} />
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}
