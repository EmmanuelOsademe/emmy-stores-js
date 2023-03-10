import "./chart.css";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

export default function Chart({title, data, dataKey, grid}){
    console.log(grid)

    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4/1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd"/>
                    <YAxis label={{ value: 'Sales ($)', angle: -90, position: 'insideLeft' }}/>
                    <Line type="monotone" dataKey={dataKey}/>
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#555" strokeDasharray={1/1} />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}