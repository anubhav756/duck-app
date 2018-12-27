import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PBInput extends Component {
    componentWillMount() {
        const {
            defaultValue,
            onChange,
        } = this.props;

        onChange(defaultValue);
    }
    render() {
        const {
            label,
            value,
            placeholder,
            onChange,
            onBlur,
            error,
            touched,
        } = this.props;

        return (
            <div>
                {label}
                <input
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                />
                {touched && error}
            </div>
        );
    }
}

PBInput.propTypes = {
    label        : PropTypes.string.isRequired,
    placeholder  : PropTypes.string.isRequired,
    onChange     : PropTypes.func.isRequired,
    onBlur       : PropTypes.func.isRequired,
    touched      : PropTypes.bool,
    value        : PropTypes.string,
    defaultValue : PropTypes.string,
};

PBInput.defaultProps = {
    value        : '',
    defaultValue : '',
    touched      : false,
};

export default PBInput;
