import React from 'react';

class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
        };
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
                <div>
                    <h1>Something went wrong</h1>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
