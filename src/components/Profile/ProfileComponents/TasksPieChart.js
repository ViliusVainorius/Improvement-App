import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class TasksPieChart extends Component {
    render() {
        const { completed, incompleted } = this.props;

        const options = {
            theme: "dark2",
            exportEnabled: false,
            animationEnabled: false,
            title: {
                text: "Task completion chart",
            },
            data: [{
                type: "pie",
                startAngle: 120,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 15,
                indexLabel: "{label}",
                dataPoints: [
                    { y: completed, label: "Completed" },
                    { y: incompleted, label: "Incomplete" },
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