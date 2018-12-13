import React, { Component } from 'react';
import { FormContext } from './index';

const initialContext = {};

class Form extends Component {
    constructor() {
        super();

        this.state = {
            formContext: initialContext,
            updateContext: newContext => this.setState({
                ...this.state,
                ...newContext,
            }),
        };
    }
    render() {
        const {
            children,
            formContext,
            updateContext,
        } = this.props;

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
