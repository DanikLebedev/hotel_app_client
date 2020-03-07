import React from 'react';
import { Container } from 'react-bootstrap';
import { handleClickOutside } from '../../sharedMethods/outsideClick';
import { Close, Delete } from '@material-ui/icons';
import {Button} from "@material-ui/core";

interface ConfirmDeleteModal {
    show: boolean;
    onDelete: () => Promise<void>;
    id: string;
    closeModal: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModal> = (props: ConfirmDeleteModal) => {
    return (
        <Container
            onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClickOutside(event, 'overlay-feedback', props)}
            fluid={true}
            id={'overlay-feedback'}
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="admin-form">
                    <h3>Confirm deleting</h3>
                    <p>Are you sure?</p>
                    <Button color="primary" variant="contained" className="mt-3" onClick={props.onDelete}>
                        Delete <Delete />
                    </Button>
                    <button className={'close-modal-button'} onClick={() => props.closeModal()}>
                        <Close />
                    </button>
                </div>
            </div>
        </Container>
    );
};
