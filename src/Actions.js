const ACTIONS = {
    JOIN: 'join',
    JOINED: 'joined',
    DISCONNECTED: 'disconnected',
    CODE_CHANGE: 'code-change',
    SYNC_CODE: 'sync-code',
    LEAVE: 'leave',
};

module.exports = ACTIONS;

// react can understand this syntax and the i=older version of node which is used in the project
//thats why we're using this file for both the client side and the server side as well