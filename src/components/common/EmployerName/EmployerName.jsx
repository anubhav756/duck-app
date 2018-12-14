import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmployerDropdown from './EmployerDropdown';
import { FormContext } from '../Form';
import { requireEmployer } from '../../../api/validations';
import './EmployerName.css';

const filterOptions = (value, options, key) =>
    options.filter(o =>
        o[key]
            .toLowerCase()
            .indexOf(value[key].toLowerCase()) !== -1
    );

class EmployerName extends Component {
    constructor() {
        super();

        this.state = {
            options    : [],
            isOpen     : false,
            isFetching : false
        };

        this.clickListener = this.clickListener.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }
    componentWillMount() {
        this.updateValue(this.getInitialValue());
    }
    componentDidMount() {
        document.addEventListener('click', this.clickListener);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.clickListener);
    }
    getInitialValue() {
        const {
            keywordToValue,
            valueKey,
            labelKey,
        } = this.props;

        return keywordToValue('', valueKey, labelKey);
    }
    clickListener(e) {
        const currentElement = document.getElementById('employer-name');

        if (!currentElement.contains(e.target)) {
            this.toggleDropdown(false);
        } else {
            this.toggleDropdown(true);
        }
    }
    toggleDropdown(isOpen) {
        this.setState({ isOpen });
    }
    handleChange(e) {
        const keyword = e.target.value;
        const {
            fetchEmployers,
            keywordToValue,
            valueKey,
            labelKey,
        } = this.props;

        this.setState({ isFetching: true });
        this.updateValue(keywordToValue(keyword, valueKey, labelKey));
        fetchEmployers(keyword)
            .then(options => this.setState({
                options,
                isFetching: false,
            }));
    }
    handleSelect(employer) {
        this.updateValue(employer);
        this.toggleDropdown(false);
    }
    updateValue(newValue) {
        const { updateValue } = this.context;
        const validations = [requireEmployer];

        updateValue('employer', newValue, validations)
    }
    render() {
        const {
            valueKey,
            labelKey,
        } = this.props;
        const {
            options,
            isOpen,
            isFetching,
        } = this.state;
        const { formValues } = this.context;
        const { employer = this.getInitialValue() } = formValues;

        return (
            <div id="employer-name">
                Employer Name<br />
                <input
                    className="input"
                    placeholder="Search for employers"
                    value={employer[labelKey]}
                    onChange={this.handleChange}
                />
                <EmployerDropdown
                    options={filterOptions(employer, options, labelKey)}
                    onSelect={this.handleSelect}
                    isOpen={isOpen}
                    isFetching={isFetching}
                    valueKey={valueKey}
                    labelKey={labelKey}
                />
            </div>
        );
    }
}

EmployerName.contextType = FormContext;

EmployerName.propTypes = {
    fetchEmployers : PropTypes.func.isRequired,
    keywordToValue : PropTypes.func,
    valueKey       : PropTypes.string,
    labelKey       : PropTypes.string,
};

EmployerName.defaultProps = {
    keywordToValue : (keyword, valueKey, labelKey) => ({
        [valueKey] : -1,
        [labelKey] : keyword,
    }),
    valueKey       : 'value',
    labelKey       : 'label',
};

export default EmployerName;
