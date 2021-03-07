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

(function () {

    d3.json("/api/customer/exercise", function (data) {
        ReactDOM.render(<SmokersChart dataArray={data}/>, document.querySelector('#output'));
    });

    // d3.json("/api/customer/insurance", function (data) {
    //     ReactDOM.render(<InsuranceChart dataArray={data}/>, document.querySelector('#output'));
    // });

}());