import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import './OrdersPage.scss';
import '../../assets/rglstyles.css';
import '../../assets/resizablestyles.css';
import { OrderService } from '../../APIServices/orderService';
import { Customer, Feedback, Order, OrderCart, OrderCarts, Orders } from '../../interfaces/clientInterfaces';
import { ClientContext } from '../../context/client.context';
import toaster from 'toasted-notes';
import { Container, Col, Row, Modal } from 'react-bootstrap';
import { OrderItem } from '../../components/OrderItem/OrderItem';
import { CustomerService } from '../../APIServices/customerService';
import Loader from '../../components/Loader/Loader';
import { FeedbackService } from '../../APIServices/feedbackService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { FindRoomForm } from '../../components/FindRoomForm/FindRoomForm';
import { IconButton, Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { EditUserInfoForm } from '../../components/EditUserInfoForm/EditUserInfo';
import { Pagination } from '../../components/Pagination/Pagination';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../components/ErrorsComponents/ErrorMessage';

interface FeedbackFormData {
    message: string;
}

export const OrderPage: React.FC = () => {
    const { register, handleSubmit, errors } = useForm<FeedbackFormData>();

    const auth = useContext(ClientContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [userInfo, setUserInfo] = useState<Customer>({ email: '', lastName: '', name: '', order: [], password: '' });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [orderHistory, setOrderHistory] = useState<OrderCart[]>([]);
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
    const fetchOrders: CallableFunction = useCallback(async () => {
        const { orders }: Orders = await OrderService.getUserOrders({ Authorization: `Bearer ${auth.token}` });
        setOrders(orders);
    }, [auth.token]);

    const fetchCustomerInfo: CallableFunction = useCallback(async () => {
        const customer: Customer = await CustomerService.getCustomer({ Authorization: `Bearer ${auth.token}` });
        setUserInfo(customer);
    }, [auth.token]);

    const fetchOrdersHistory = useCallback(async () => {
        const { ordercarts }: OrderCarts = await OrderService.getOrdersHistory({
            Authorization: `Bearer ${auth.token}`,
        });
        setOrderHistory(ordercarts);
    }, [auth.token]);

    const deleteOrderHandler = async (event: React.MouseEvent<EventTarget>): Promise<void> => {
        const target = event.target as HTMLButtonElement;
        const formData: FormData = new FormData();
        formData.append('_id', target.id);
        if (target) {
            const filteredOrders = orders.filter(order => {
                return order._id === target.id;
            });
            setCls((prevState: string[]) => [...prevState, 'deleted-order']);
            setOrders(filteredOrders);
            const data = await OrderService.deleteOrder(formData);
            toaster.notify(data.message, {
                duration: 2000,
            });
        }
    };

    const changeFeedbackTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setFeedbackForm({ ...feedbackForm, [event.target.name]: event.target.value });
    };

    const addFeedbackHandler = async (): Promise<void> => {
        const data = await FeedbackService.postFeedback(
            { ...feedbackForm, userEmail: userInfo.email, userName: userInfo.name, userLastName: userInfo.lastName },
            { Authorization: `Bearer ${auth.token}`, 'Content-Type': 'application/json' },
        );
        toaster.notify(data.message, {
            duration: 2000,
        });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setEditProps({ ...userInfo });
        setIsEdit(true);
        setShow(true);
    };

    const showOrdersHistory = () => {
        setShowModal(true);
    };

    const closeOrdersHistory = () => {
        setShowModal(false);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(4);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = orderHistory.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        fetchOrders();
        fetchCustomerInfo();
        fetchOrdersHistory();
    }, [orders, fetchOrders, fetchCustomerInfo, fetchOrdersHistory]);

    return (
        <div className="order-page">
            <FindRoomForm />
            <div className="order-page-bg"></div>
            <Container className="order-page-wrapper">
                <Row>
                    <Col lg={3} md={3} sm={3} xs={12}>
                        {userInfo ? (
                            <div className="order-page-user-info">
                                <h4>Your Info</h4>
                                <p>
                                    <FontAwesomeIcon icon={faEnvelope} /> Email: {userInfo.email}
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faUser} /> Full name: {userInfo.name} {userInfo.lastName}{' '}
                                </p>
                                <IconButton onClick={handleShow}>
                                    <Edit />
                                </IconButton>
                                <Button onClick={showOrdersHistory}>Show orders history</Button>
                            </div>
                        ) : (
                            <Loader />
                        )}
                        <div className={'feedback-form'}>
                            <h4>Leave your feedback</h4>
                            <textarea
                                rows={5}
                                cols={45}
                                className={'form-control'}
                                placeholder={'your feedback...'}
                                onChange={changeFeedbackTextHandler}
                                name={'message'}
                                ref={register({ required: true })}
                            />
                            <ErrorMessage error={errors.message} type={'error'} />
                            <button onClick={handleSubmit(addFeedbackHandler)} className={'button'}>
                                Send feedback
                            </button>
                        </div>
                    </Col>
                    <Col
                        lg={8}
                        md={8}
                        sm={8}
                        xs={12}
                        className="d-flex justify-content-around align-items-center flex-column"
                    >
                        <h4>Your Available Orders</h4>
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            {orders ? (
                                orders.map((item: Order, key: number) => {
                                    return (
                                        <OrderItem key={key} classes={cls} order={item} onDelete={deleteOrderHandler} />
                                    );
                                })
                            ) : (
                                <h2>There no orders yet</h2>
                            )}
                        </div>
                    </Col>
                </Row>
                <Modal show={showModal} onHide={closeOrdersHistory}>
                    <Modal.Header closeButton>
                        <Modal.Title>Orders History</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="grid-table-wrapper">
                            <table className="m-3 grid-table order-page-history">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPosts.length
                                        ? currentPosts.map((order, key) => {
                                              return (
                                                  <tr key={key}>
                                                      <td>{order.category}</td>
                                                      <td>{order.checkIn.split('T')[0]}</td>
                                                      <td>{order.checkOut.split('T')[0]}</td>
                                                      <td>{order.status}</td>
                                                  </tr>
                                              );
                                          })
                                        : null}
                                </tbody>
                            </table>
                            <Pagination
                                postPerPage={postPerPage}
                                totalPosts={orderHistory.length}
                                currentPage={currentPage}
                                paginate={paginate}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="button-book" onClick={closeOrdersHistory}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
                <EditUserInfoForm isEdit={isEdit} show={show} editProps={editProps} closeModal={handleClose} />
            </Container>
        </div>
    );
};
