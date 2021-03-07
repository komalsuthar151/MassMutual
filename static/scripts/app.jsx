class TableComponent extends React.Component {

    render() {

        let output;

        if (this.props.dataArray && this.props.dataArray.length > 0) {

            let columns = Object.keys(this.props.dataArray[0]).map((key, index) => {
                return (<th key={"th" + index}>{key}</th>);
            });

            let rows = this.props.dataArray.map((data, index) => {

                let row = Object.keys(data).map((key, index) => {
                    return (<td key={"td-" + index}>{data[key]}</td>);
                });

                return <tr key={"tr-" + index}>{row}</tr>;
            });

            output = (
                <table>
                    <thead>
                    <tr>
                        {columns}
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            );
        } else {
            output = <p>No data available</p>;
        }

        return output;
    }
}

(function () {

    d3.json("/api/customer/gender/income", function(data){
        console.log(data);
        ReactDOM.render(<TableComponent dataArray={data}/>, document.querySelector('#output'));
    });

}());