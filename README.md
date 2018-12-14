## Example:

        <Form onSubmit={(formValues, formErrors) => { ... }}>

            ...

            <EmployerName fetchEmployers={fetchEmployers} />

            ...

            <button type="submit">Submit</button>

            ...

        </Form>


## Props: (* - Required)

`fetchEmployers`*: *(Function(keyword) => Promise)* - Function that returns a promise to resolve employers list. Argument provided is the key word entered

`keywordToValue`: *(Function(keyword) => Object)* - Function that returns the value of the employer field to be set as employer name is typed. Default `(keyword, valueKey, labelKey) => ({ [valueKey] : -1, [labelKey] : keyword, })`

`valueKey`: *String* - Specify key to be used as unique key from `options` list in dropdown. Default `value`

`labelKey`: *String* - Specify key to be used as display value from `options` list in dropdown. Default `label`

## Todo
Display error as component loses focus

## Read
https://reactjs.org/docs/context.html
