import React from 'react';
import './ErrorComponents.scss';
import { NavLink } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
        };
    }

    logout() {
        localStorage.removeItem('userData');
    }

    componentDidCatch(error, errorInfo) {
    }

    render():
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string
        | number
        | {}
        | React.ReactNodeArray
        | React.ReactPortal
        | boolean
        | null
        | undefined {
        if (this.state.hasError) {
            return (
                <div className={'error-page-wrapper'}>
                    <div className={'flex-column d-flex justify-content-center align-items-center'}>
                        <h1>Authorization time is over, please log in again</h1>
                    </div>
                    <div className={'error-image'}>
                        <img src="https://www.inksystem.biz/uploaded/img/article/error-5100.jpg" alt="" />
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
