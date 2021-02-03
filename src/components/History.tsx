import dayjs from "dayjs"
import React from "react"
import { TimeDB } from "../definitions"

interface HistoryProps {
    data: TimeDB[]
}
export default function History(props: HistoryProps){
    const times = props.data

    return <div className="history">
        <table className="history-table">
            <thead>
                <tr>
                    <th>time</th>
                {/* <th>date</th> */}
                </tr>
            </thead>
            <tbody>
                {times.map( (t, k) => {
                    return <tr className="history-line" key={k}>
                        <td className="time">
                            {dayjs(t.time).format('mm : ss : SSS')}
                        </td>
                        {/* <td className="date">
                            {dayjs(t.timestamp).format('DD/MM/YY HH:mm')}
                        </td> */}
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}