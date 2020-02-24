import React, { useCallback, useEffect, useState } from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { ClientContext } from './context/client.context';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { AdminPage } from './pages/AdminPage/AdminPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { Feedback, Room } from './interfaces/clientInterfaces';
import { RoomService } from './APIServices/roomService';
import { AdminContext } from './context/admin.context';
import { FeedbackService } from './APIServices/feedbackService';

const App: React.FC = () => {
    const { login, logout, token, userId, userStatus, userEmail } = useAuth();
    const isAuthenticated = !!token;
    const routes: JSX.Element = useRoutes(isAuthenticated, userStatus);
    const [fetchedRooms, setFetchedRooms] = useState<Room[]>([]);
    const [fetchedFeedbacks, setFetchedFeedbacks] = useState<Feedback[]>([]);

    const fetchFeedback = useCallback(() => {
        FeedbackService.getAllFeedbacks().then(({ feedbacks }) => {
            const filteredFeedbacks = feedbacks.filter(feedback => {
                return feedback.approved;
            });

            setFetchedFeedbacks(filteredFeedbacks);
        });
    }, []);

    const fetchRoom: CallableFunction = useCallback(() => {
        RoomService.getAllRooms().then(({ rooms }) => setFetchedRooms(rooms));
    }, []);

    useEffect(() => {
        fetchRoom();
        fetchFeedback();
    }, [fetchRoom, fetchFeedback]);

    if (userStatus === 'admin') {
        return (
            <AdminContext.Provider
                value={{
                    token,
                    login,
                    logout,
                    userId,
                    isAuthenticated,
                    userStatus,
                }}
            >
                <AdminPage />
            </AdminContext.Provider>
        );
    }

    return (
        <ClientContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                isAuthenticated,
                userStatus,
                userEmail,
                fetchedRooms,
                fetchedFeedbacks,
            }}
        >
            <Router>
                <Header />
                <ScrollToTop />
                {routes}
            </Router>
            <Footer />
        </ClientContext.Provider>
    );
};
export default App;
