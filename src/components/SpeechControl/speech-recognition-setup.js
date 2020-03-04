import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

export const Dictaphone = ({
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript,
    recognition,
}) => {
    const [routes, setRoutes] = useState([]);
    const [listening, setListening] = useState(false)
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
            history.push(`/${routes.slice(0, 1).join()}`);
            resetTranscript()
        }
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return null;
    }


    return (
        <div className="w-50 bg-white">
            <button onClick={() => setListening(!listening)}>Toggle Listening</button>
            <span color={
                '#000'
            }>{transcript}</span>
        </div>
    );
};

Dictaphone.propTypes = {
    transcript: propTypes.string,
    resetTranscript: propTypes.func,
    browserSupportsSpeechRecognition: propTypes.bool,
    finalTranscript: propTypes.string,
    recognition: propTypes.object,
};

export default SpeechRecognition(Dictaphone);
