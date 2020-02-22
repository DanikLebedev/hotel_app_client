import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Category, Room, Rooms } from '../../interfaces/clientInterfaces';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/auth.context';
import { useHistory } from 'react-router-dom';
import { RoomService } from '../../APIServices/roomService';
import { CategoryService } from '../../APIServices/categoryService';
import toaster from 'toasted-notes';
import ScrollableAnchor from 'react-scrollable-anchor';

export const HomePageBookForm: React.FC = (): JSX.Element => {
    return (
        <Container>
            <ScrollableAnchor id={'home-page-book-form'}>
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <div className="home-page__book-form">
                            <h2>Choose Your Room</h2>
                        </div>
                    </Col>
                </Row>
            </ScrollableAnchor>
        </Container>
    );
};
