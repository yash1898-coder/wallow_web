import * as echarts from "echarts/core"
import { useEffect, useState } from "react"
import {
    formatDate,
    getAverage,
    getChartVisualIndicators,
    onChartResize,
} from "../utils"
import { useEditProductStore } from "../stores/useEditProductStore"
import { useTabs } from "./useTabs"
import { useQuery } from "react-query"
import {
    getProgressSummary,
    getProgressSummaryWithChart,
} from "../api/progress"

export const useDailyProgress = (ref) => {
    const { editingProduct } = useEditProductStore()
    const [chartVisible, setChartVisible] = useState(false)

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

    const { currTab, onTabChange, setCurrTab } = useTabs(tabs)

    const {
        isLoading,
        error,
        isFetching,
        refetch,
        data: summary,
    } = useQuery(
        ["progressSummary", editingProduct.id],
        () =>
            chartVisible
                ? getProgressSummaryWithChart(editingProduct.id)
                : getProgressSummary(editingProduct.id),
        {
            refetchOnWindowFocus: false,
            retry: false,
            onSuccess: (res) => {
                const { graph_data } = res
                console.log(graph_data)
                if (currTab.data.length < 1) {
                    console.log(graph_data)
                    setTabs((prev) =>
                        prev.map((item) => {
                            return {
                                ...item,
                                xAxisData: graph_data
                                    .map(
                                        (team) => team.team_history[item.title]
                                    )
                                    .flat()
                                    .map((feedback) => feedback?.created_at),
                                data: graph_data
                                    .map((team) =>
                                        team.team_history[item.title].map(
                                            (feedback) => feedback.score
                                        )
                                    )
                                    .flat(),
                            }
                        })
                    )
                    setCurrTab(() => ({
                        title: "1W",
                        subtitle: "Past week",
                        xAxisData: graph_data
                            .map((team) => team.team_history["1W"])
                            .flat()
                            .map((feedback) => feedback.created_at),
                        data: graph_data
                            .map((team) =>
                                team.team_history["1W"].map(
                                    (feedback) => feedback.score
                                )
                            )
                            .flat(),
                    }))
                }
            },
        }
    )

    useEffect(() => {
        if (chartVisible) refetch()
    }, [chartVisible])

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
            left: "3%",
            right: "3%",
            top: "3%",
            bottom: "2%",
            containLabel: true,
        },
        xAxis: {
            boundaryGap: false,
            data:
                currTab?.xAxisData?.map((date) => formatDate(new Date(date))) ??
                [],
            type: "category",
        },
        yAxis: {
            type: "value",
        },
        series: {
            name: currTab?.title,
            type: "line",
            showSymbol: false,
            smooth: true,
            areaStyle: {
                color: getChartVisualIndicators(getAverage(currTab?.data)).color
                    .item,
                opacity: 100,
            },
            itemStyle: {
                color: getChartVisualIndicators(getAverage(currTab?.data)).color
                    .item,
            },
            emphasis: {
                focus: "series",
            },
            data: currTab?.data,
        },
    }

    useEffect(() => {
        let chart
        if (
            summary &&
            !isLoading &&
            !isFetching &&
            summary?.summary.length > 0 &&
            chartVisible
        ) {
            chart = echarts.init(ref.current)
            chart.setOption(config)

            window.addEventListener("resize", () => onChartResize(chart))
        }

        return () => {
            window.removeEventListener("resize", () => onChartResize(chart))
        }
    }, [config, currTab, summary, isLoading, isFetching, chartVisible])

    return {
        summary,
        config,
        onTabChange,
        isFetching,
        isLoading,
        currTab,
        error,
        tabs,
        setChartVisible,
        chartVisible,
    }
}
