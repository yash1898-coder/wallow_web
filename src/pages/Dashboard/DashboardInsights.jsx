import * as echarts from "echarts"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { Tablist } from "../../components/Tablist"
import { useTabs } from "../../hooks/useTabs"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { NoDataInsights } from "../../components/NoDataPlaceholders/NoDataInsights"
import { getInsights } from "../../api/insights"
import { TeamTablist } from "../../components/TeamTablist"

import design from "../../assets/home/design.png"
import engineering from "../../assets/home/engineering.png"
import hr from "../../assets/home/HR.png"
import marketing from "../../assets/home/marketing.png"
import product from "../../assets/home/product.png"
import operations from "../../assets/home/operations.png"
import finance from "../../assets/home/finance.png"
import { Spinner } from "../../components/Spinner"
import { ErrorMessage } from "../../components/ErrorMessage"
import { onChartResize, pageSpinnerStyle } from "../../utils"

export const DashboardInsights = () => {
    const { editingProduct } = useEditProductStore()

    const [tabs, setTabs] = useState([
        {
            title: "1W",
            data: [],
        },
        {
            title: "2W",
            data: [],
        },
        {
            title: "1M",
            data: [],
        },
        {
            title: "2M",
            data: [],
        },
        {
            title: "3M",
            data: [],
        },
        {
            title: "6M",
            data: [],
        },
        {
            title: "1Y",
            data: [],
        },
    ])

    const { currTab, onTabChange, setCurrTab } = useTabs(tabs)

    const {
        tabs: teamTabs,
        currTab: currTeamTab,
        onTabChange: onTeamTabChange,
    } = useTabs([
        {
            icon: design,
            title: "Design",
        },
        {
            icon: engineering,
            title: "Engineering",
        },
        {
            icon: hr,
            title: "HR",
        },
        {
            icon: marketing,
            title: "Marketing",
        },
        {
            icon: product,
            title: "Product",
        },
        {
            icon: operations,
            title: "Operations",
        },
        {
            icon: finance,
            title: "Finance",
        },
    ])

    const {
        isLoading,
        error,
        data: insights,
        isFetching,
        refetch,
    } = useQuery(
        ["insights"],
        () => getInsights(editingProduct?.id, currTeamTab.title),
        {
            retry: false,
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                const newTabs = [...tabs].map((tab, idx) => {
                    return {
                        ...tab,
                        data: res[idx]
                            ? res[idx][tab.title].map((item) => ({
                                  name: item.summary,
                                  value: item.users_affected,
                                  statements: item.statements,
                              }))
                            : [],
                    }
                })
                setTabs(newTabs)
                setCurrTab(newTabs[0])
            },
        }
    )

    const colors = [
        "#7fb6ea",
        "#ffda8f",
        "#f1867c",
        "#40c867",
        "#aa79cb",
        "#0A85D1",
        "#f8c6c4",
        "#ffbb33",
        "#FF0000", // Red
        "#FFA500", // Orange
        "#FFFF00", // Yellow
        "#00FF00", // Green
        "#0000FF", // Blue
        "#800080", // Purple
        "#FFC0CB", // Pink
        "#00FFFF", // Cyan
        "#FF00FF", // Magenta
        "#40E0D0", // Turquoise
        "#00FF00", // Lime
        "#008080", // Teal
        "#4B0082", // Indigo
        "#800000", // Maroon
        "#808000", // Olive
        "#000080", // Navy
        "#7FFFD4", // Aquamarine
        "#FF00FF", // Fuchsia
        "#E6E6FA", // Lavender
        "#FF7F50", // Coral
        "#C0C0C0", // Silver
        "#FFD700", // Gold
        "#EE82EE", // Violet
        "#DDA0DD", // Plum
        "#708090", // Slate
        "#DC143C", // Crimson
        "#008000", // Emerald
        "#E0115F", // Ruby
        "#FFBF00", // Amber
        "#FFFFF0", // Ivory
        "#0F52BA", // Sapphire
        "#FF007F", // Rose
        "#007FFF", // Azure
        "#1E90FF", // Dodger Blue
        "#FFD700", // Gol
    ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const config = {
        legend: {
            bottom: "0",
        },
        tooltip: {
            show: true,
            shadowBlur: 0,
            borderRadius: 11.5,
            textStyle: { fontWeight: "600", fontFamily: "Inter" },
            // formatter: `{b}: {c} users affected`,
            formatter: function (params) {
                // 'params' contains information about the data point
                const dataIndex = params.dataIndex
                const dataItem = currTab?.data[dataIndex] // Get the data item for the current point
                const statements = dataItem.statements // Get the statements array
                const users_affected = dataItem.value // Get the users_affected number

                let tooltipContent = `<b>${
                    users_affected === 1 ? "User" : "Users"
                } affected: ${users_affected}</b> <br />`
                for (let i = 0; i < statements.length; i++) {
                    tooltipContent += "• " + statements[i] + "<br>"
                }

                return `<div style="max-width: ${
                    window.innerWidth < 768 ? "150px" : "400px"
                }; white-space: normal;">${tooltipContent}</div>`
            },
        },
        series: [
            {
                top: window.innerWidth < 768 ? "-25%" : "0",
                name: `No data for ${currTab.title} for ${currTeamTab.title}`,
                type: "pie",
                radius: ["20%", "60%"],
                center: ["50%", "50%"],
                roseType: "area",
                itemStyle: {
                    borderRadius: 8,
                    color: "#d3d3d3",
                },
                data: currTab.data.map((item, idx) => ({
                    ...item,
                    itemStyle: { color: colors[idx] ? colors[idx] : "#1E90FF" },
                })),
            },
        ],
    }

    const ref = useRef(null)

    useEffect(() => {
        refetch()
    }, [currTeamTab])

    useEffect(() => {
        let chart
        if (!isLoading && !isFetching && editingProduct.teams.length > 0) {
            chart = echarts.init(ref.current)
            chart.setOption(config)
            window.addEventListener("resize", () => onChartResize(chart))
        }

        return () => {
            window.removeEventListener("resize", () => onChartResize(chart))
        }
    }, [config, currTab, isLoading, isFetching, insights, editingProduct])

    if (editingProduct.teams.length < 1) {
        return <NoDataInsights />
    }

    return isLoading ? (
        <Spinner style={pageSpinnerStyle} />
    ) : error ? (
        <ErrorMessage message={error.message} />
    ) : (
        <div
            className="dashboard-insights"
            style={{ paddingBottom: "2rem" }}
        >
            <div className="container dashboard-insights__container">
                <div
                    ref={ref}
                    className="dashboard-insights__chart"
                />
                <TeamTablist
                    tabs={teamTabs}
                    onTabChange={onTeamTabChange}
                    currTab={currTeamTab}
                />
                <div className="mt">
                    <Tablist
                        tabs={tabs}
                        onTabChange={onTabChange}
                        currTab={currTab}
                    />
                </div>
            </div>
        </div>
    )
}
