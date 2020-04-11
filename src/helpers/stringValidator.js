import { prop, compose, length, gt, lt, not , evolve, F, when, append, test} from 'ramda';

// String => ValidationObject
const valueToValidationObject = (value) => {
    return {
        value,
        valid: true,
        errors: []
    }
}

const joinErrors = (errorArray) => {
    return errorArray.join(', ');
}

// ValidationObject => Boolean
const isValid = prop('valid');
// ValidationObject => value
const getValue = prop('value');
// ValidationObject => Error string
const getErrorMsg = compose(joinErrors, prop('errors'));

const addError = (errorMsg) => evolve({
    valid: F,
    errors: append(errorMsg)
});

const wrapValidator = (errorMsg, validator) => when(
    compose(not, validator, getValue),
    addError(errorMsg)
)

const stringLengthLess9 = wrapValidator('Length of input string is bigger then 9', compose(gt(10), length));
const stringLengthMore2 = wrapValidator('Length of input string is less then 2', compose(lt(2), length));
const stringIsPositiveNumber = wrapValidator('String couldn\'t be parsed into positive number', test(/^[0-9]+\.?[0-9]+$/));

const validate = compose(stringIsPositiveNumber, stringLengthMore2, stringLengthLess9, valueToValidationObject);

export {validate, isValid, getValue, getErrorMsg}