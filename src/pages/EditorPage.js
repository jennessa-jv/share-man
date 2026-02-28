import React,{useState,useEffect,useRef} from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
import { initSocket } from '../socket';
import { useLocation, useNavigate ,Navigate,useParams} from 'react-router-dom';
import ACTIONS from '../Actions';
import toast from 'react-hot-toast';
//we have two blocks the left block and thr right block so to code that up(mainwrap and aside(with another wrap))
const EditorPage = () => {
  const socketRef = useRef(null);
  const location=useLocation();
  const reactNavigator=useNavigate();
  const [clients, setClients] = useState([])
  const {roomId}=useParams(); //this params has a roomid which comes from the url we only sent from the home page
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

            socketRef.current.emit(ACTIONS.JOIN, { //emitting the socket->server listens in server.js
                roomId, //within the url
                username: location.state?.username, //using useNavigate we had sent the username from the home page while logging in 
                //so for that we use useLocation
            });
            console.log("Emitting JOIN");
        //listening for the newly jouined member to all the members
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {  
                    if (username !== location.state?.username) {  //if i join(i am the newly joined member) i shouldnt be notified at all only the old members
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }
                    setClients(clients); //pushing the clients that have joined
                    // socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    //     code: codeRef.current,
                    //     socketId,
                    // });
                }
            );
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => { //filtering out the disconnected client from the clients array
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();
        return () => { //cleanup function->when the component unmounts we need to disconnect the socket and also remove all the listeners
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
    }, []);
      if (!location.state) { //if we dont get the state
        return <Navigate to="/" />;
    }

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
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }}
                />
                  </div>
                    </div>
  )
}

export default EditorPage
