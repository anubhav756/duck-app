import React, { Component } from 'react';
import { FormContext } from './index';

const initialContext = {
    employer: {
        value: -1,
        label: '',
    },
};

class Form extends Component {
    constructor() {
        super();

        this.state = {
            formContext: initialContext,
        };

        this.updateContext = this.updateContext.bind(this);
    }
    componentWillMount() {
        this.setState({
            updateContext: this.updateContext,
        });
    }
    updateContext(newContext) {
        const { formContext } = this.state;

        this.setState({
            ...this.state,
            formContext: {
                ...formContext,
                ...newContext,
            },
        });
    }
    render() {
        const { children } = this.props;
        const {
            formContext,
            updateContext,
        } = this.state;

        return (
            <FormContext.Provider value={{
                formContext,
                updateContext,
            }}>
                <form>
                    {children}
                </form>
            </FormContext.Provider>
        );
    }
}

export default Form;
