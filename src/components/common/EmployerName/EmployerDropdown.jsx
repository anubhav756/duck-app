import React from 'react';
import PropTypes from 'prop-types';

const EmployerDropdown = ({
    options,
    onSelect,
    isOpen,
    isFetching,
    valueKey,
    labelKey,
}) => isOpen ? (
    <div className="dropdown">
        {
            isFetching ?
                <div>Fetching...</div> :
                options.map(o => (
                    <button key={o[valueKey]} onClick={() => onSelect(o)}>
                        {o[labelKey]}
                    </button>
                ))
        }
    </div>
) : null;

EmployerDropdown.propTypes = {
    options    : PropTypes.array.isRequired,
    onSelect   : PropTypes.func.isRequired,
    isOpen     : PropTypes.bool.isRequired,
    isFetching : PropTypes.bool.isRequired,
    valueKey   : PropTypes.string.isRequired,
    labelKey   : PropTypes.string.isRequired,
}

export default EmployerDropdown;
