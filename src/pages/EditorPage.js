import React,{useState} from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
//we have two blocks the left block and thr right block so to code that up(mainwrap and aside(with another wrap))
const EditorPage = () => {
   const [clients,setClients]=useState([
    {socketId:1,username:'jenjen'},
    {socketId:2,username:"jenben"},
     {socketId:3,username:"kenben"},
     {socketId:4,username:"keben"}
   ])
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
