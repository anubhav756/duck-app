import React, { Component } from 'react';
import Form from './components/common/Form';
import EmployerName from './components/common/EmployerName';

class App extends Component {
    constructor() {
        super();

        this.state = {
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
            submittedValues: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(submittedValues) {
        this.setState({ submittedValues });
    }
    render() {
        const {
            isFetching,
            options,
            submittedValues,
        } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <EmployerName
                    options={options}
                    isFetching={isFetching}
                    isOpen
                />
                <br />
                <button type="submit">Submit</button>
                <br />
                {submittedValues && JSON.stringify(submittedValues)}
            </Form>
        );
    }
}

export default App;
