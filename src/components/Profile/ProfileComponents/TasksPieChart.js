import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class TasksPieChart extends Component {
    render() {
        const { completed, incompleted, label1, label2, title } = this.props;

        const options = {
            theme: "dark2",
            exportEnabled: false,
            animationEnabled: true,
            title: {
                text: title,
            },
            data: [{
                type: "pie",
                startAngle: 120,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label} {y}",
                indexLabelFontSize: 15,
                indexLabel: "{label} {y}",
                dataPoints: [
                    { y: completed, label: label1 },
                    { y: incompleted, label: label2 },
                ]
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default TasksPieChart;