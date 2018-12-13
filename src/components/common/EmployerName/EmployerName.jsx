import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmployerDropdown from './EmployerDropdown';
import { FormContext } from '../Form';
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
    }
    componentDidMount() {
        document.addEventListener('click', this.clickListener);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.clickListener);
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
        const {
            fetchEmployers,
            emptyValue,
            valueKey,
            labelKey,
        } = this.props;
        const { updateContext } = this.context;
        const { value } = e.target;

        updateContext({
            employer: {
                [valueKey] : emptyValue(value),
                [labelKey] : value,
            },
        });
        this.setState({ isFetching: true });
        fetchEmployers(value)
            .then(options => this.setState({
                options,
                isFetching: false,
            }));
    }
    handleSelect(employer) {
        const { updateContext } = this.context;

        updateContext({ employer });
        this.toggleDropdown(false);
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
        const {
            formContext: {
                employer,
            },
        } = this.context;

        return (
            <div id="employer-name">
                Employer Name<br />
                <input
                    className="input"
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
    emptyValue     : PropTypes.func,
    valueKey       : PropTypes.string,
    labelKey       : PropTypes.string,
};

EmployerName.defaultProps = {
    emptyValue : () => -1,
    valueKey   : 'value',
    labelKey   : 'label',
};

export default EmployerName;
