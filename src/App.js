import React, { Component } from 'react';
import { fetchEmployers } from './api/employers';
import Form from './components/common/Form';
import EmployerName from './components/common/EmployerName';

class App extends Component {
    constructor() {
        super();

        this.state = {
            submittedValues : null,
            submittedErrors : null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(submittedValues, submittedErrors) {
        this.setState({ submittedValues, submittedErrors });
    }
    render() {
        const {
            submittedValues,
            submittedErrors,
        } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <EmployerName fetchEmployers={fetchEmployers} />
                <br />
                <button type="submit">Submit</button>
                <br />
                {submittedValues && `values: ${JSON.stringify(submittedValues)}`}
                <br />
                {submittedErrors && `errors: ${JSON.stringify(submittedErrors)}`}
            </Form>
        );
    }
}

export default App;
