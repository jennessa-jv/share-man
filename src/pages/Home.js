import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "../App.css";
const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState(''); //this state is for setting the new room id
    const [username, setUsername] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault(); // on clicking nrew room the page gets refreshed so
        const id = uuidV4();
        setRoomId(id);
        console.log(id)
        toast.success("Created a new room", {
  icon: null
});
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('Room ID & username required',
                {
                    icon:null
                }
            );
            return;
        }
// Then inside the EditorPage, you can access it using:

// import { useLocation } from "react-router-dom";

// const location = useLocation();

// console.log(location.state.username);

// which gives:

// Jen
        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        });
    };
// This function checks whether the user pressed the Enter key.
    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/logo.png"
                    alt="favicon.ico"
                />
                <h4 className="mainLabel">Input your Room ID</h4>
                 <div className="inputGroup">
                     <input
                        type="text"
                        className="inputBox"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Enter the room identification"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                   
                    <button className="btn joinBtn" onClick={joinRoom}>
                        Join
                    </button>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a
                            onClick={createNewRoom}
                            className="createNewBtn"
                        >
                            new room
                        </a>
                    </span>
                </div>
            </div>
             <footer>
                <h4>
                    Built&nbsp;by&nbsp;
                    <a href="https://github.com/jennessa-jv/share-man">Jen's code</a>
                </h4>
            </footer> 
        </div>
        
    );
};

export default Home;