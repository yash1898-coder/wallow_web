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
import React, { useRef, useEffect, useState } from "react"
import {
    chartDropdownOptions,
    formatDate,
    getAverage,
    getChartVisualIndicators,
    getGroupedByDate,
    getJumpToOptions,
    getTodayOrYesterdayDate,
    onChartResize,
    onJumpTo,
    pageSpinnerStyle,
    stringToDate,
} from "../../utils"
import { useTabs } from "../../hooks/useTabs"
import { Tablist } from "../../components/Tablist"
import { Popup } from "../../components/Popup"
import { PeopleButton } from "../../components/PeopleButton"
import { ModalWrapper } from "../../components/Modals/ModalWrapper"
import { useStore } from "../../stores/useStore"
import { DeletionConfirmationModal } from "../../components/Modals/DeletionConfirmationModal"
import { AddTeamsModal } from "../../components/Modals/AddTeamsModal"
import { EditProductAreaModal } from "../../components/Modals/EditProductAreaModal"
import { TeamsModal } from "../../components/Modals/TeamsModal"
import { NoFeedbackCard } from "../../components/NoFeedbackCard"
import { ChartDropdown } from "../../components/ChartDropdown"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {
    deleteProductArea,
    getProductArea,
    getProductAreaSummary,
} from "../../api/productAreas"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEditProductAreaStore } from "../../stores/useEditProductAreaStore"
import { Spinner } from "../../components/Spinner"
import { JumpToDropdown } from "../../components/JumpToDropdown"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { TeamFunctionIcon } from "../../components/TeamFunctionIcon"
import { useAuthStore } from "../../stores/useAuthStore"
import ToggleChartButton from "../../components/ToggleChartButton"

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

export const ProductArea = () => {
    const { id } = useParams()
    const { user } = useAuthStore()
    const { modals, openModal, openToast, closeModal } = useStore()
    const { editingProduct } = useEditProductStore()
    const { setEditingProductArea } = useEditProductAreaStore()
    const { pathname } = useLocation()
    const [chartVisible, setChartVisible] = useState(false)

    const navigate = useNavigate()
    const queryClient = useQueryClient()

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

    const { isLoading, data: productArea } = useQuery(
        ["productAreas", id],
        () => getProductArea(id),
        {
            retry: false,
            onSuccess: (productArea) => {
                setEditingProductArea(productArea)
            },
        }
    )

    const { isLoading: summaryLoading, data: summary } = useQuery(
        ["productAreas", id, "summary"],
        () => getProductAreaSummary(id),
        {
            retry: false,
            refetchOnWindowFocus: false,
            enabled: productArea?.teams.length > 0,
            onSuccess: (res) => {
                const { graph_data } = res
                if (currTab.data.length < 1) {
                    setTabs((prev) =>
                        prev.map((item) => {
                            return {
                                ...item,
                                xAxisData: graph_data
                                    .map((team) => team[item.title])
                                    .flat()
                                    .map((feedback) => feedback.created_at),
                                data: graph_data
                                    .map((team) =>
                                        team[item.title].map(
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
                            .map((team) => team["1W"])
                            .flat()
                            .map((feedback) => feedback.created_at),
                        data: graph_data
                            .map((team) =>
                                team["1W"].map((feedback) => feedback.score)
                            )
                            .flat(),
                    }))
                }
            },
        }
    )

    const {
        isLoading: deleteProductAreaLoading,
        error,
        mutate: onDelete,
    } = useMutation(() => deleteProductArea(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["productAreas", id])
            queryClient.invalidateQueries(["productAreas"])
            openToast({ text: "Product area deleted!" })
            closeModal("deletionConfirmation")
            navigate("/dashboard/progress")
        },
    })

    useEffect(() => {
        onTabChange(tabs[0])
    }, [pathname])

    const ref = useRef(null)
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
        if (summary?.summary.length > 0 && !summaryLoading && chartVisible) {
            chart = echarts.init(ref.current)
            chart.setOption(config)

            window.addEventListener("resize", () => onChartResize(chart))
        }

        return () => {
            window.removeEventListener("resize", () => onChartResize(chart))
        }
    }, [config, currTab, summaryLoading, summary, chartVisible])
    const getPopupOptions = () => {
        if (
            editingProduct?.role === "Primary Product Owner" ||
            editingProduct?.role === "Primary Organization Owner"
        ) {
            return [
                {
                    title: "Edit product area",
                    onClick: () => openModal("editProductArea"),
                },
                {
                    title: "Delete product area",
                    onClick: () => openModal("deletionConfirmation"),
                },
            ]
        } else {
            return [
                {
                    title: "Edit product area",
                    onClick: () => openModal("editProductArea"),
                },
            ]
        }
    }

    const productAreaName = productArea?.name

    return isLoading ? (
        <Spinner style={pageSpinnerStyle} />
    ) : (
        <div
            style={{
                backgroundColor: "#fff",
                paddingBlock: "2rem",
            }}
            className=" dashboard-team"
        >
            {user.role === "Owner" && (
                <ModalWrapper open={modals["deletionConfirmation"]}>
                    <DeletionConfirmationModal
                        isLoading={deleteProductAreaLoading}
                        modal={"deletionConfirmation"}
                        error={error}
                        onClick={onDelete}
                        toDelete={productAreaName}
                    />
                </ModalWrapper>
            )}

            <ModalWrapper open={modals["teams"]}>
                <TeamsModal
                    productAreaId={id}
                    teams={productArea?.teams.map((t) => ({
                        ...t,
                        function: t?.function ?? "Sales",
                    }))}
                />
            </ModalWrapper>

            <ModalWrapper open={modals["addTeams"]}>
                <AddTeamsModal
                    existingTeams={productArea?.teams}
                    inviteTo={editingProduct.name}
                    id={id}
                />
            </ModalWrapper>

            <ModalWrapper open={modals["editProductArea"]}>
                <EditProductAreaModal
                    id={id}
                    productArea={productArea}
                />
            </ModalWrapper>

            <section>
                <div className="container dashboard-team__header ">
                    <div className="flex flex-wrap dashboard-team__header-buttons">
                        <div className="flex">
                            <PeopleButton
                                teams={true}
                                onClick={() => openModal("teams")}
                                people={productArea?.teams.map((t) => ({
                                    ...t,
                                    function: t?.function ?? "Sales",
                                    color: t.color,
                                }))}
                            />
                            <button
                                onClick={() => openModal("addTeams")}
                                className="button"
                            >
                                Add teams
                            </button>
                        </div>
                        <ToggleChartButton
                            color={
                                getChartVisualIndicators(
                                    getAverage(currTab?.data)
                                ).color.item
                            }
                            setChartVisible={setChartVisible}
                            chartVisible={chartVisible}
                        />
                    </div>
                    <div
                        className="flex justify-between"
                        style={{ flex: 1 }}
                    >
                        <div
                            className=" flow"
                            data-spacing="extrasmall"
                        >
                            <div className="flex">
                                <div
                                    className="w-full flow"
                                    data-spacing="none"
                                >
                                    <p>Product Area</p>
                                    <div className="flex dashboard-page-header">
                                        <h1 className="fs-700 fw-700">
                                            {productAreaName}
                                        </h1>
                                        {editingProduct?.role.includes(
                                            "Owner"
                                        ) && (
                                            <Popup
                                                options={getPopupOptions()}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className="fs-300  ">
                                Group teams to get daily updates on work
                                progress, blockers, and impediments impacting
                                your product area.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {summary?.summary.length > 0 && chartVisible && (
                <section className="container mt">
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
                    <div className="flex chart-footer mt">
                        <Tablist
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
            )}
            {summaryLoading ? (
                <Spinner style={{ marginTop: "2rem" }} />
            ) : summary === undefined || summary?.summary.length < 1 ? (
                <div className="container mt">
                    <NoFeedbackCard text={"Radio silence"} />
                </div>
            ) : (
                <section
                    className="flow"
                    data-spacing="small"
                >
                    {Object.values(
                        getGroupedByDate(
                            summary?.summary.map((i) => ({
                                ...i,
                                created_at: stringToDate(i.created_at),
                            }))
                        )
                    ).map((item, idx) => (
                        <React.Fragment key={idx}>
                            <JumpToDropdown
                                id={item[0].created_at.setHours(0, 0, 0, 0)}
                                onJumpTo={(timePeriod) =>
                                    onJumpTo(
                                        timePeriod,
                                        summary?.summary.map((i) => ({
                                            ...i,
                                            created_at: stringToDate(
                                                i.created_at
                                            ),
                                        }))
                                    )
                                }
                                options={getJumpToOptions(
                                    summary?.summary.map((i) => ({
                                        ...i,
                                        created_at: stringToDate(i.created_at),
                                    }))
                                )}
                                placeholder={getTodayOrYesterdayDate(
                                    item[0].created_at
                                )}
                            />
                            {item.map((i, idx) => (
                                <Item
                                    i={i}
                                    key={idx}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </section>
            )}
        </div>
    )
}

const Item = ({ i }) => {
    return (
        <div className="hover-card-wrapper">
            <div
                className={`message-card container flex`}
                style={{
                    alignItems: "flex-start",
                }}
            >
                <TeamFunctionIcon
                    team={i.function ?? "Sales"}
                    color={i.color}
                />
                <div className="message-card__content">
                    <h3
                        className="fw-600"
                        style={{
                            marginBottom: ".1rem",
                        }}
                    >
                        {i.Team}
                    </h3>
                    {typeof i["Daily summary"] === "object" ? (
                        i["Daily summary"].map((i, idx) => (
                            <p
                                key={idx}
                                className=""
                            >
                                {i}
                            </p>
                        ))
                    ) : (
                        <p className="">{i["Daily summary"]}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
