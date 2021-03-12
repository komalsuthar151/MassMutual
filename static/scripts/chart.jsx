class SmokersChart extends React.Component {

    componentDidMount() {
        let canvasAndDataArray = []
        document.querySelectorAll(".canvasToPlot").forEach((canvas, index) => {

            canvasAndDataArray.push({
                canvas: canvas,
                data: this.props.dataArray[index]
            })
        })

        canvasAndDataArray.forEach(canvasAndData => {
            if (canvasAndData.data.data.length) {
                let dataKeys = Object.keys(canvasAndData.data.data[0])

                let context = canvasAndData.canvas.getContext('2d');
                let chart = new Chart(context, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: canvasAndData.data.data.map(data => data[dataKeys[0]]),
                        datasets: [{
                            label: 'Smokers',
                            backgroundColor: 'rgb(0, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: canvasAndData.data.data.map(data => data[dataKeys[1]])
                        }]
                    },

                    // Configuration options go here
                    options: {
                        title: {
                            display: true,
                            text: canvasAndData.data.title
                        }
                    }
                });
            }
        })

    }

    render() {

        return (
            <div>
                {this.props.dataArray ?
                    this.props.dataArray.map(_ => <canvas className="canvasToPlot"
                                                          style={{
                                                              maxWidth: "100%",
                                                              maxHeight: "100%",
                                                              marginBottom: "50px"
                                                          }}/>)
                    : null}
            </div>
        )
    }
}

class InsuranceChart extends React.Component {

    componentDidMount() {
        let ctx = document.querySelector("#canvasToPlot").getContext('2d');
        var scatterChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Scatter Dataset',
                    backgroundColor: 'rgb(0, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: this.props.dataArray.data.map(data => ({
                        x: data.income,
                        y: data.insurance_segment_id
                    }))
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        position: 'bottom',
                        labelString: 'Insurance Amount',
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return '$' + value;
                            }
                        }
                    }],
                    yAxes: [{
                        position: 'bottom',
                        labelString: 'Insurance Label',
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: (value, index, values) => {
                                return this.props.dataArray.insurance_label[index];
                            }
                        }
                    }]
                }
            }
        });
    }

    render() {
        console.log(this.props.dataArray.insurance_label)
        return (
            <div>
                <canvas id="canvasToPlot" style={{maxWidth: "100%", maxHeight: "100%", marginBottom: "50px"}}/>
            </div>
        )
    }
}

class AllChart extends React.Component {
    state = {
        x: "",
        y: ""
        // x: "Customer Youtube User Rank",
        // y: "Customer Facebook User Rank"
    }

    componentDidMount() {


    }

    updateChart = () => {
        let canvasEl = document.querySelector("#canvasToPlot")
        if (canvasEl) {
            let ctx = canvasEl.getContext('2d');
            let x_label_key = this.state.x.toLowerCase().split(" ").join("_")
            let y_label_key = this.state.y.toLowerCase().split(" ").join("_")

            let x_axis_key = x_label_key + "_num"
            let y_axis_key = y_label_key + "_num"

            let data = this.props.dataArray[x_axis_key].map((xData, index) => {
                let returnData = null
                if (xData.toString().trim() && this.props.dataArray[y_axis_key][index].toString().trim()) {
                    returnData = {
                        x: Number(xData.toString().trim()),
                        y: Number(this.props.dataArray[y_axis_key][index].toString().trim())
                    }
                }
                return returnData
            })

            let optionScale = {
                xAxes: [{
                    position: 'bottom',
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: (value, index, values) => {
                            let returnValue = value
                            if (this.props.dataArray[x_label_key]) {
                                for (let i of this.props.dataArray[x_label_key]) {
                                    if (Number(i[Object.keys(i)[0]]) === Number(value)) {
                                        returnValue = Object.keys(i)[0]
                                        break;
                                    }
                                }
                            }
                            return returnValue
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: this.state.x
                    }
                }],
                yAxes: [{
                    position: 'bottom',
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: (value, index, values) => {
                            let returnValue = value
                            if (this.props.dataArray[y_label_key]) {
                                for (let i of this.props.dataArray[y_label_key]) {
                                    if (Number(i[Object.keys(i)[0]]) === Number(value)) {
                                        returnValue = Object.keys(i)[0]
                                        break;
                                    }
                                }
                            }
                            return returnValue
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: this.state.y
                    }
                }]
            }

            if (this.props.dataArray[y_label_key]) {
                optionScale.yAxes[0].ticks['stepSize'] = 1
            }
            if (this.props.dataArray[x_label_key]) {
                optionScale.xAxes[0].ticks['stepSize'] = 1
            }

            var scatterChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: '',
                        backgroundColor: 'rgb(0, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: data.filter(d => d !== null)
                        // data: [{
                        //     x: -10,
                        //     y: 0
                        // }, {
                        //     x: 0,
                        //     y: 10
                        // }, {
                        //     x: 10,
                        //     y: 5
                        // }]
                    }]
                },
                options: {
                    scales: optionScale
                }
            });
        }
    }

    selectChangeHandler = (ev, axis) => {
        this.setState((prevState, _) => {
            prevState[axis] = ev.target.value
            return {...prevState}
        })
    }

    render() {
        console.log({...this.props.dataArray})
        if (this.state.x && this.state.y){
            this.updateChart()
        }

        return (
            <div>
                <div>
                    <div>
                        <span>X Axis : </span>
                        <select onChange={(ev) => this.selectChangeHandler(ev, "x")}>
                            {Object.keys(this.props.dataArray).map((dataKey, i) => {
                                let splittedDataKey = dataKey.split("_")
                                if (splittedDataKey[splittedDataKey.length - 1] === "num") {
                                    splittedDataKey.pop()
                                    return <option
                                        key={`x-option-${i}`}
                                        value={splittedDataKey.join(" ")}>{splittedDataKey.join(" ")}</option>
                                } else {
                                    return null
                                }
                            })}
                        </select>
                    </div>

                    <div>
                        <span>Y Axis : </span>
                        <select onChange={(ev) => this.selectChangeHandler(ev, "y")}>
                            {Object.keys(this.props.dataArray).map((dataKey,i) => {
                                let splittedDataKey = dataKey.split("_")
                                if (splittedDataKey[splittedDataKey.length - 1] === "num") {
                                    splittedDataKey.pop()
                                    return <option
                                        key={`y-option-${i}`}
                                        value={splittedDataKey.join(" ")}>{splittedDataKey.join(" ")}</option>
                                } else {
                                    return null
                                }
                            })}
                        </select>
                    </div>
                </div>
                <canvas id="canvasToPlot" style={{maxWidth: "100%", maxHeight: "100%", marginBottom: "50px"}}/>
            </div>
        )
    }
}

(function () {

    d3.json("/api/customer/exercise", function (data) {
        ReactDOM.render(<SmokersChart dataArray={data}/>, document.querySelector('#output'));
    });

    d3.json("/api/customer/insurance", function (data) {
        ReactDOM.render(<InsuranceChart dataArray={data}/>, document.querySelector('#output1'));
    });

    d3.json("/api/customer/all", function (data) {
        ReactDOM.render(<AllChart dataArray={data}/>, document.querySelector('#output2'));
    });

}());