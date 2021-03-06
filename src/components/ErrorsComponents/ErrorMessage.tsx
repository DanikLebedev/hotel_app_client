import React from 'react';
import { Error } from '@material-ui/icons';
import { object } from 'prop-types';
import { FieldError } from 'react-hook-form';

interface ErrorMessage extends FieldError {
    error: FieldError | undefined;
}

export const ErrorMessage = ({ error }: ErrorMessage) => {
    if (error) {
        switch (error.type) {
            case 'required':
                return (
                    <span className='validate-error'>
                        <Error color={'error'} />
                        This is required
                    </span>
                );
            case 'minLength':
                return (
                    <span className={'validate-error'}>
                        <Error color={'error'} />
                        Your password need minimum 6 characters
                    </span>
                );
            case 'pattern':
                return (
                    <span className={'validate-error'}>
                        <Error color={'error'} />
                        Enter a valid email address
                    </span>
                );
            default:
                return null;
        }
    }

    return null;
};

ErrorMessage.propTypes = {
    error: object,
};
