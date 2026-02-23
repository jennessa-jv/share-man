import React,{useState} from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
import { initSocket } from '../socket';
//we have two blocks the left block and thr right block so to code that up(mainwrap and aside(with another wrap))
const EditorPage = () => {
  const socketRef = useRef(null);
       useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket(); //await because initRef is an async function which returns a promise while it waits for the connection to be established
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }
                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                }
            );
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
    }, []);
  return (
      <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img
                            className="logoImage"
                            src="/logo.png"
                            
                        />
                    </div>
                     <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client  //returning a component here
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                    </div>
                     <button className="btn copyBtn">
                    Copy ROOM ID
                </button>
                     <button className="btn leaveBtn">
                    Leave
                </button>
                    </div>
                    <div className="editorWrap">
                <Editor    //a different component for the editor!!
                    // socketRef={socketRef}
                    // roomId={roomId}
                    // onCodeChange={(code) => {
                    //     codeRef.current = code;
                    // }}
                />
                  </div>
                    </div>
  )
}

export default EditorPage
