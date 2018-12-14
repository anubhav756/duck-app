import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './index';

const initialContext = {
    employer: {
        value : -1,
        label : '',
    },
};

class Form extends Component {
    constructor() {
        super();

        this.state = {
            formContext: initialContext,
        };

        this.updateContext = this.updateContext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(e) {
        const { onSubmit } = this.props;
        const { formContext } = this.state;

        e.preventDefault();
        onSubmit(formContext);
    }
    render() {
        const { children } = this.props;
        const { formContext } = this.state;

        return (
            <FormContext.Provider value={{
                formContext,
                updateContext: this.updateContext,
            }}>
                <form onSubmit={this.handleSubmit}>
                    {children}
                </form>
            </FormContext.Provider>
        );
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Form;
