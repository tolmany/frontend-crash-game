import { AuthorizationTypes } from '../actions/authorization';
import { put }                from 'redux-saga/effects';
import { AlertActions }       from '../actions/alert';

const getFailMessage = (action) => {
    switch (action.type) {
        case AuthorizationTypes.REQUEST_SMS_FAILED:
            return 'An error occurred requesting sms. Please try again!';

        case AuthorizationTypes.VERIFY_SMS_FAILED:
            return 'An error occurred verifying sms. Please try again!';

        case AuthorizationTypes.SAVE_ADDITIONAL_INFO_FAILED:
            return 'An error occurred saving details. Please try again!';
    }

    return null;
};

const handleFail = function* (action) {
    const message = getFailMessage(action);

    yield put(AlertActions.showError({
        message,
    }));
};

export default {
    handleFail,
};