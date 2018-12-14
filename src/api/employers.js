export const fetchEmployers = keyword =>
    new Promise(resolve => setTimeout(() => resolve([{
        value: 1,
        label: 'Google',
    }, {
        value: 2,
        label: 'Gogo',
    }, {
        value: 3,
        label: 'Gooo',
}]), 1000));
