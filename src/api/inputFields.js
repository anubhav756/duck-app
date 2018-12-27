import {
    required
} from './validations';

export default [{
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    validate: [required],
}, {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter last name',
    validate: [required],
}];
