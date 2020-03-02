import React from 'react';
import './SubmitButton.scss';

interface SubmitButtonProps {
    onClick: () => Promise<void> | void;
    title: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = (props: SubmitButtonProps) => {
    return (
        <button className={'find-room-button'} onClick={props.onClick}>
            {props.title}
        </button>
    );
};
