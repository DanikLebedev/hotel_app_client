import { Container } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { Data } from '../../interfaces/clientInterfaces';
import toaster from 'toasted-notes';
import { Customer } from '../../interfaces/clientInterfaces';
import { CustomerService } from '../../APIServices/customerService';
import { ClientContext } from '../../context/client.context';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../ErrorsComponents/ErrorMessage';
import { handleClickOutside } from '../../sharedMethods/outsideClick';
import { Close} from '@material-ui/icons';


type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface EditUserInfoForm {
    closeModal: () => void;
    show: boolean;
    editProps: Customer;
    isEdit: boolean;
}

interface OrdersPageFormData {
    email: string;
    name: string;
    lastName: string;
}

export const EditUserInfoForm: React.FC<EditUserInfoForm> = (props: EditUserInfoForm) => {
    const { register, handleSubmit, errors } = useForm<OrdersPageFormData>();

    const [userForm, setUserForm] = useState<Customer>(props.editProps);
    const auth = useContext(ClientContext);

    const updateInfoHandler = async (): Promise<void> => {
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
        <Container
            onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClickOutside(event, 'overlay-edit-user', props)}
            id={'overlay-edit-user'}
            fluid={true}
            className={props.show ? 'show-modal add-modal-wrapper' : 'hide-modal'}
        >
            <div key={1} className="d-flex justify-content-around align-items-center">
                <div className="change-user-info-form ">
                    <h3>Change User form</h3>
                    <label htmlFor="name">Your name</label>
                    <input
                        onChange={userInfoChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={userForm.name}
                        name="name"
                        id="name"
                        placeholder="name"
                        ref={register({ required: true })}
                    />
                    <ErrorMessage error={errors.name} type={'error'} />
                    <label htmlFor="email">Your last name</label>
                    <input
                        onChange={userInfoChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={userForm.lastName}
                        name="lastName"
                        id="lastName"
                        placeholder="lastName"
                        ref={register({ required: true })}
                    />
                    <ErrorMessage error={errors.lastName} type={'error'} />

                    <label htmlFor="email">Your email</label>
                    <input
                        onChange={userInfoChangeHandler}
                        type="text"
                        className={'form-control'}
                        value={userForm.email}
                        name="email"
                        id="email"
                        placeholder="email"
                        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    />
                    <ErrorMessage error={errors.email} type={'error'} />
                    <button onClick={handleSubmit(updateInfoHandler)} className="button-book">
                        Update Info
                    </button>
                    <button className={'close-modal-button'} onClick={() => props.closeModal()}>
                       <Close/>
                    </button>
                </div>
            </div>
        </Container>
    );
};
