import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmployerDropdown from './EmployerDropdown';
import './EmployerName.css';

const filterOptions = (value, options, key) =>
    options.filter(o =>
        o[key]
            .toLowerCase()
            .indexOf(value[key].toLowerCase()) === 0
    );

class EmployerName extends Component {
    constructor() {
        super();

        this.state = {
            isOpen: false,
        };

        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidMount() {
        const currentElement = document.getElementById('employer-name');

        document.addEventListener('click', (event) => {
            if (!currentElement.contains(event.target)) {
                this.toggleDropdown(false);
            } else {
                this.toggleDropdown(true);
            }
          });
    }
    toggleDropdown(isOpen) {
        this.setState({ isOpen });
    }
    handleSelect(option) {
        const { onSelect } = this.props;

        onSelect(option);
        this.toggleDropdown(false);
    }
    render() {
        const {
            value,
            options,
            onChange,
            isFetching,
            valueKey,
            labelKey,
        } = this.props;
        const {
            isOpen,
        } = this.state;

        return (
            <div id="employer-name">
                Employer Name<br />
                <input
                    className="input"
                    value={value[labelKey]}
                    onChange={e => onChange(e.target.value)}
                />
                <EmployerDropdown
                    options={filterOptions(value, options, labelKey)}
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

EmployerName.propTypes = {
    value      : PropTypes.shape({
        value  : PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        label  : PropTypes.string.isRequired,
    }).isRequired,
    options    : PropTypes.array.isRequired,
    onChange   : PropTypes.func.isRequired,
    onSelect   : PropTypes.func.isRequired,
    isFetching : PropTypes.bool,
    valueKey   : PropTypes.string,
    labelKey   : PropTypes.string,
};

EmployerName.defaultProps = {
    valueKey   : 'value',
    labelKey   : 'label',
    isFetching : false,
};

export default EmployerName;
