import React, { Component } from 'react';
import PBInput from './components/PBInput';
import inputFields from './api/inputFields';


const validate = (name, value) => inputFields
    .find(field => field.name === name)
    .validate
    .reduce(
        (isError, validator) => isError || validator(value),
        false,
    );

class App extends Component {
    constructor(props) {
        super(props);

        /**
         * formField: {
         *     fieldName: {
         *         value,
         *         error,
         *         touched,
         *     },
         * 
         *     ...
         * }
         */
        this.state = {
            formFields: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(name, value) {
        this.setState(({ formFields }) => ({
            formFields: {
                ...formFields,
                [name]: {
                    value,
                    error: validate(name, value),
                },
            }
        }));
    }
    handleBlur(name) {
        this.setState(({ formFields }) => ({
            formFields: {
                ...formFields,
                [name]: {
                    ...formFields[name],
                    touched: true,
                },
            },
        }));
    }
    handleSubmit() {
        const { formFields } = this.state;

        Object.keys(formFields).forEach(fieldName => this.setState(state => ({
            formFields: {
                ...state.formFields,
                [fieldName]: {
                    ...state.formFields[fieldName],
                    touched: true,
                },
            },
        })));
    }
    render() {
        const { formFields } = this.state;

        return (
            <div>
                {
                    inputFields.map(field => (
                        <PBInput
                            {...field}
                            {...formFields[field.name]}
                            key={field.name}
                            onChange={value => this.handleChange(field.name, value)}
                            onBlur={() => this.handleBlur(field.name)}
                        />
                    ))
                }
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default App;
