import { io } from 'socket.io-client';

export const initSocket = async () => { //this is an async function which returns a promise later so await will be used(in editorpage.js as useref)
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    console.log(process.env.REACT_APP_BACKEND_URL);
    return io(process.env.REACT_APP_BACKEND_URL, options); //this io is a function
};