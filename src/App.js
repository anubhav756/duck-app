import React, { Component } from 'react';
import { fetchEmployers } from './api/employers';
import Form from './components/common/Form';
import EmployerName from './components/common/EmployerName';

class App extends Component {
    constructor() {
        super();

        this.state = {
            submittedValues : null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(submittedValues) {
        this.setState({ submittedValues });
    }
    render() {
        const { submittedValues } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <EmployerName fetchEmployers={fetchEmployers} />
                <br />
                <button type="submit">Submit</button>
                <br />
                {submittedValues && JSON.stringify(submittedValues)}
            </Form>
        );
    }
}

export default App;
