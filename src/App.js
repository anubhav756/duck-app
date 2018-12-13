import React, { Component } from 'react';
import EmployerName from './components/common/EmployerName';

class App extends Component {
    constructor() {
        super();

        this.state = {
            employer: {
                value: -1,
                label: '',
            },
            isFetching: false,
            options: [{
                value: 1,
                label: 'Google',
            }, {
                value: 2,
                label: 'Gogo',
            }, {
                value: 3,
                label: 'Gooo',
            }],
        };

        this.handleEmployerChange = this.handleEmployerChange.bind(this);
        this.handleEmployerSelect = this.handleEmployerSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmployerChange(employerName) {
        this.setState({
            employer: {
                value: -1,
                label: employerName
            },
            isSubmitted: false,
        });
        this.setState({ isFetching: true });
        setTimeout(() => this.setState({ isFetching: false }), 1000);
    }
    handleEmployerSelect(employer) {
        this.setState({ employer });
    }
    handleSubmit() {
        this.setState({ isSubmitted: true });
    }
    render() {
        const {
            employer,
            isFetching,
            options,
            isSubmitted,
        } = this.state;

        return (
            <div>
                <EmployerName
                    value={employer}
                    options={options}
                    isFetching={isFetching}
                    onChange={this.handleEmployerChange}
                    onSelect={this.handleEmployerSelect}
                    isOpen
                />
                <br />
                <button onClick={this.handleSubmit}>Submit</button>
                <br />
                {isSubmitted && `Submitted: ${JSON.stringify(employer)}`}
            </div>
        );
    }
}

export default App;
