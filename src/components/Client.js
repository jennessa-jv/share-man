import React from 'react'
import Avatar from 'react-avatar';
const Client = ({ username }) => {
    // shortcut for this
//     const EditorPage = (props) => {
//   const username = props.username;
//   return <div>{username}</div>;
// };
    return (
        <div className="client">
            <Avatar name={username} size={50} round="14px" />
            <span className="userName">{username}</span>
        </div>
    );
};

export default Client
