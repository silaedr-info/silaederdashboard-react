import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { n: this.props.secs }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.tickfn(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    tickfn() {
        this.setState({
            n: this.state.n - 1
        })
    }

    render() {
        return (
            <div>
                {this.state.n <= 0 ? (
                    <h1>Done</h1>
                ) : (
                    <h1>{this.state.n}</h1>
                )}

            </div>
        )
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { secs: 1, subm: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ subm: true })
        console.log(this.state.subm);
    }

    handleChange(event) {
        var target = event.target;
        var val = target.value;
        this.setState({ secs: Number(val) });
    }

    render() {
        return (
            <div>
                {this.state.subm ? (
                    <Timer secs={this.state.secs} />
                ) :
                    (
                        <form onSubmit={this.handleSubmit}>
                            <input name="secs" type="number" onChange={this.handleChange} value={this.state.secs}></input>
                            <button type="submit">Submit</button>
                        </form>
                    )}
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);