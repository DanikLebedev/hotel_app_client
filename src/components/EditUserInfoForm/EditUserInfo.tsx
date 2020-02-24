import { Container } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { Category, Data } from '../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Customer } from '../../interfaces/clientInterfaces';
import { CustomerService } from '../../APIServices/customerService';
import { ClientContext } from '../../context/client.context';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface EditUserInfoForm {
    closeModal: () => void;
    show: boolean;
    editProps: Customer;
    isEdit: boolean;
}

export const EditUserInfoForm: React.FC<EditUserInfoForm> = (props: EditUserInfoForm) => {
    const [userForm, setUserForm] = useState<Customer>(props.editProps);
    const auth = useContext(ClientContext);

    const addCategoryHandler = async (): Promise<void> => {
        if (props.isEdit) {
            const data: Data = await CustomerService.updateCustomer(JSON.stringify(userForm), {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
            });
            toaster.notify(data.message, {
                duration: 2000,
            });
        } else {
            return;
        }
        props.closeModal();
    };

    useEffect(() => {
        if (props.isEdit) {
            setUserForm(props.editProps);
        } else {
            setUserForm({ email: '', lastName: '', name: '', order: [], password: '' });
        }
    }, [props.isEdit, props.editProps]);

    const userInfoChangeHandler = (event: InputEvent): void => {
        setUserForm({ ...userForm, [event.target.name]: event.target.value });
    };

    return (
        <Container fluid={true} className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}>
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="change-user-info-form ">
                    <h3>Category form</h3>
                    <label htmlFor="name">Your name</label>
                    <input
                        onChange={userInfoChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={userForm.name}
                        name="name"
                        id="name"
                        placeholder="name"
                    />
                    <label htmlFor="email">Your last name</label>
                    <input
                        onChange={userInfoChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={userForm.lastName}
                        name="lastName"
                        id="lastName"
                        placeholder="lastName"
                    />
                    <label htmlFor="email">Your email</label>
                    <input
                        onChange={userInfoChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={userForm.email}
                        name="email"
                        id="email"
                        placeholder="email"
                    />
                    <button onClick={addCategoryHandler} className="button-book">
                        Update Info
                    </button>
                </div>
                <button className={'close-button'} onClick={() => props.closeModal()}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
        </Container>
    );
};
