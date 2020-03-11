import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import './OrdersPage.scss';
import '../../assets/rglstyles.css';
import '../../assets/resizablestyles.css';
import { OrderService } from '../../APIServices/orderService';
import { Customer, Feedback, Order, OrderCart } from '../../interfaces/clientInterfaces';
import { ClientContext } from '../../context/client.context';
import toaster from 'toasted-notes';
import { Container, Col, Row } from 'react-bootstrap';
import { OrderItem } from '../../components/OrderItem/OrderItem';
import { CustomerService } from '../../APIServices/customerService';
import Loader from '../../components/Loader/Loader';
import { FeedbackService } from '../../APIServices/feedbackService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import FindRoomForm from '../../components/FindRoomForm/FindRoomForm';
import { IconButton, Button, Tooltip } from '@material-ui/core';
import { Edit, Settings, Close, Send, History } from '@material-ui/icons';
import { EditUserInfoForm } from '../../components/EditUserInfoForm/EditUserInfo';
import { OrdersHistoryModal } from '../../components/OrdersHistoryModal/OrdersHistoryModal';
import { FeedbackModal } from '../../components/FeedBackModal/FeedbackModal';

export const OrderPage: React.FC = () => {
    const context: ClientContext = useContext(ClientContext);
    const fetchedOrders: Order[] = context.fetchedUserOrders;
    const fetchedOrderHistory: OrderCart[] = context.orderHistory;
    const [orders, setOrders] = useState<Order[]>(fetchedOrders);
    const [userInfo, setUserInfo] = useState<Customer>({ email: '', lastName: '', name: '', order: [], password: '' });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [showToolBar, setShowToolBar] = useState<boolean>(false);
    const [orderHistory, setOrderHistory] = useState<OrderCart[]>(fetchedOrderHistory);
    const [editProps, setEditProps] = useState<Customer>({
        email: '',
        lastName: '',
        name: '',
        order: [],
        password: '',
    });
    const [feedbackForm, setFeedbackForm] = useState<Feedback>({
        approved: false,
        message: '',
        userEmail: '',
        userLastName: '',
        userName: '',
    });
    const [cls, setCls] = useState<Array<string>>(['order-item']);
    const [show, setShow] = useState(false);

    const update = useCallback(() => {
        OrderService.getUserOrders({ Authorization: `Bearer ${context.token}` }).then(({ orders }) =>
            setOrders(orders),
        );
        OrderService.getOrdersHistory({ Authorization: `Bearer ${context.token}` }).then(({ ordercarts }) =>
            setOrderHistory(ordercarts),
        );
    }, [context.token]);

    const fetchCustomerInfo: CallableFunction = useCallback(async () => {
        const customer: Customer = await CustomerService.getCustomer({ Authorization: `Bearer ${context.token}` });
        setUserInfo(customer);
    }, [context.token]);

    const deleteOrderHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        const formData: FormData = new FormData();
        formData.append('_id', target.id);
        if (target) {
            const filteredOrders: Order[] = orders.filter(order => {
                return order._id === target.id;
            });
            setCls((prevState: string[]) => [...prevState, 'deleted-order']);
            setOrders(filteredOrders);
            try {
                const data = await OrderService.deleteOrder(formData);
                toaster.notify(data.message, {
                    duration: 2000,
                });
                update();
            } catch (e) {
                console.log(e);
            }
        }
    };

    const changeFeedbackTextHandler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setFeedbackForm({ ...feedbackForm, [event.target.name]: event.target.value });
    };

    const addFeedbackHandler = async (): Promise<void> => {
        const data = await FeedbackService.postFeedback(
            { ...feedbackForm, userEmail: userInfo.email, userName: userInfo.name, userLastName: userInfo.lastName },
            { Authorization: `Bearer ${context.token}`, 'Content-Type': 'application/json' },
        );
        toaster.notify(data.message, {
            duration: 2000,
        });
        setShowFeedbackModal(false);
    };

    const onToggleToolBar = () => {
        setShowToolBar(!showToolBar);
    };

    const handleClose = (): void => setShow(false);
    const handleShow = (): void => {
        setEditProps({ ...userInfo });
        setIsEdit(true);
        setShow(true);
    };

    const showOrdersHistory = (): void => {
        setShowModal(!showModal);
    };

    const closeOrdersHistory = (): void => {
        setShowModal(!showModal);
    };

    const showFeedbackForm = (): void => {
        setShowFeedbackModal(true);
    };

    const closeFeedbackForm = (): void => {
        setShowFeedbackModal(false);
    };

    useEffect(() => {
        update();
        fetchCustomerInfo();
    }, [fetchedOrders, fetchCustomerInfo, update]);

    if (!userInfo && !fetchedOrders) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="order-page">
            <FindRoomForm />
            <div className="order-page-bg" />
            <Container className="order-page-wrapper">
                <Row>
                    <Col lg={3} md={5} sm={9} xs={9}>
                        {userInfo ? (
                            <div className="order-page-user-info">
                                <div className={showToolBar ? 'setting-wrapper open-settings' : 'setting-wrapper'}>
                                    <Tooltip title={'Edit info'}>
                                        <Button id={'show-edit-modal'} onClick={handleShow}>
                                            <Edit />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={'Show history'}>
                                        <Button onClick={showOrdersHistory}>
                                            <History />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={'Leave feedback'}>
                                        <Button onClick={showFeedbackForm}>
                                            <Send />
                                        </Button>
                                    </Tooltip>
                                </div>
                                <h4>Your Info</h4>
                                {userInfo.email ? (
                                    <>
                                        <p>
                                            <FontAwesomeIcon icon={faEnvelope} /> Email: {userInfo.email}
                                        </p>
                                        <p>
                                            <FontAwesomeIcon icon={faUser} /> Full name:{' '}
                                            {userInfo.name ? userInfo.name + userInfo.lastName : <Loader />}
                                        </p>
                                    </>
                                ) : (
                                    <Loader />
                                )}
                                <div className={'setting-button-wrapper'}>
                                    <IconButton
                                        className={
                                            showToolBar ? 'settings-button active-settings-icon' : 'settings-button'
                                        }
                                        color="inherit"
                                        onClick={onToggleToolBar}
                                        id={'toggle-settings-button'}
                                    >
                                        <Settings />
                                    </IconButton>
                                    <IconButton
                                        className={showToolBar ? 'close-button active-close-icon' : 'close-button'}
                                        onClick={onToggleToolBar}
                                    >
                                        <Close />
                                    </IconButton>
                                </div>
                            </div>
                        ) : (
                            <Loader />
                        )}
                    </Col>
                    <Col
                        lg={8}
                        md={7}
                        sm={12}
                        xs={12}
                        className="d-flex justify-content-around align-items-center flex-column"
                    >
                        <h4 className="text-white">Your Current Orders</h4>
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            {orders.length ? (
                                orders.map((item: Order, key: number) => {
                                    return (
                                        <OrderItem key={key} classes={cls} order={item} onDelete={deleteOrderHandler} />
                                    );
                                })
                            ) : (
                                <h4 className="text-white">There are no orders yet</h4>
                            )}
                        </div>
                    </Col>
                </Row>
                <OrdersHistoryModal closeModal={closeOrdersHistory} show={showModal} data={orderHistory} />
                <FeedbackModal
                    closeModal={closeFeedbackForm}
                    show={showFeedbackModal}
                    onChange={changeFeedbackTextHandler}
                    onSubmit={addFeedbackHandler}
                />
                <EditUserInfoForm isEdit={isEdit} show={show} editProps={editProps} closeModal={handleClose} />
            </Container>
        </div>
    );
};
