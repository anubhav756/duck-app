import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './index';

const initialValues = {};

class Form extends Component {
    constructor() {
        super();

        this.state = {
            formValues: initialValues,
            formErrors: {},
        };

        this.updateValue = this.updateValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    updateValue(fieldName, newContext, validations = []) {
        const {
            formValues,
            formErrors,
        } = this.state;

        this.setState({
            ...this.state,
            formValues: {
                ...formValues,
                [fieldName]: newContext,
            },
            formErrors: {
                ...formErrors,
                [fieldName]: validations.reduce(
                    (error, validator) => error || validator(newContext),
                    null,
                ),
            },
        });
    }
    handleSubmit(e) {
        const { onSubmit } = this.props;
        const {
            formValues,
            formErrors,
        } = this.state;

        e.preventDefault();
        onSubmit(formValues, formErrors);
    }
    render() {
        const { children } = this.props;
        const { formValues } = this.state;

        return (
            <FormContext.Provider value={{
                formValues,
                updateValue: this.updateValue,
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
