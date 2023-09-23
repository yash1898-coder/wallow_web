import * as echarts from "echarts/core"
import { GridComponent } from "echarts/components"
import { BarChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
import { useEffect, useRef } from "react"
import {
    addLeadingZeroToDate,
    formatDateVeryShort,
    pageSpinnerStyle,
    stringToDate,
} from "../../../utils"
import { ProgressBar } from "../../../components/ProgressBar"
import { Spinner } from "../../../components/Spinner"
import { ErrorMessage } from "../../../components/ErrorMessage"
import { useUserRecords } from "../../../hooks/useUserRecords"

echarts.use([GridComponent, BarChart, CanvasRenderer])

export const UserRecords = () => {
    const { isLoading, error, users, dates } = useUserRecords()

    const config = {
        textStyle: { fontFamily: "Inter" },
        xAxis: {
            type: "category",
            data: dates?.map((d) =>
                formatDateVeryShort(stringToDate(addLeadingZeroToDate(d)))
            ),
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                itemStyle: {
                    normal: { color: "#0a85d1" },
                    emphasis: { color: "#0a85d1" },
                },
                data: users,
                type: "bar",
            },
        ],
    }

    const ref = useRef(null)

    useEffect(() => {
        if (!isLoading) {
            const chart = echarts.init(ref.current)
            chart.setOption(config)
        }
    }, [config, isLoading])

    return (
        <div className="container user-records">
            <h1 className="fs-700 fw-700 mb">User Records</h1>
            <p>Below you'll find a summary of users for your organization.</p>
            {isLoading ? (
                <Spinner style={pageSpinnerStyle} />
            ) : error ? (
                <ErrorMessage message={error.message} />
            ) : (
                <>
                    <div
                        style={{ minHeight: "400px" }}
                        ref={ref}
                        className="user-records__chart mt"
                    />
                    <div className="mt flow">
                        <h2 className="fs-600 fw-600">Users this month</h2>
                        <ProgressBar
                            completed={users[users.length - 1]}
                            text={"/ 100"}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
