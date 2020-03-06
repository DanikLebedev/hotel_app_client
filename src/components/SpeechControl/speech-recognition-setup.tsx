import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

export const Dictaphone: React.FC<any> = ({
    transcript,
    browserSupportsSpeechRecognition,
    finalTranscript,
    recognition,
}) => {
    const [routes, setRoutes] = useState([]);
    const history = useHistory();
    const routesName = ['home', 'about', 'rooms', 'chat', 'orders', 'login', 'admin login'];
    recognition.lang = 'en-US';

    useEffect(() => {
        setRoutes(finalTranscript.split(' '));
        const filteredRoutes = routes.filter(item => {
            return routesName.filter(name => {
                return name === item;
            });
        });
        if (filteredRoutes.length !== 0) {
            history.push(`/${filteredRoutes.slice(-1).join()}`);
        }
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    return null;
};

Dictaphone.propTypes = {
    transcript: propTypes.string,
    resetTranscript: propTypes.func,
    browserSupportsSpeechRecognition: propTypes.bool,
    finalTranscript: propTypes.string,
    recognition: propTypes.object,
};

export default SpeechRecognition({ autoStart: false })(Dictaphone);
