import React, { Component } from 'react';
import Form from './components/common/Form';
import EmployerName from './components/common/EmployerName';

class App extends Component {
    constructor() {
        super();

        this.state = {
            submittedValues : null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchEmployers = this.fetchEmployers.bind(this);
    }
    handleSubmit(submittedValues) {
        this.setState({ submittedValues });
    }
    fetchEmployers() {
        return new Promise(resolve => setTimeout(() => resolve([{
            value: 1,
            label: 'Google',
        }, {
            value: 2,
            label: 'Gogo',
        }, {
            value: 3,
            label: 'Gooo',
        }]), 1000));
    }
    render() {
        const { submittedValues } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <EmployerName fetchEmployers={this.fetchEmployers} />
                <br />
                <button type="submit">Submit</button>
                <br />
                {submittedValues && JSON.stringify(submittedValues)}
            </Form>
        );
    }
}

export default App;
