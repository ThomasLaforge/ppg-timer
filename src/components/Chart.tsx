import React, { useRef, useEffect } from "react"
import * as echarts from "echarts"

export default function Chart(props: {options: echarts.EChartOption<echarts.EChartOption<echarts.EChartOption.Series>> | echarts.EChartsResponsiveOption}) {
    const {options} = props
    const myChart = useRef(null)

    useEffect(() => {
        const chart = echarts.init(myChart.current)
        chart.setOption(options)
    }, [options])

    return (
        <div
            ref={myChart}
            style={{
                width: "100%",
                height: "100%",
            }}
        ></div>
    )
}