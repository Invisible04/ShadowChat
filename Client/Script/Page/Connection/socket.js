const socket = io();
let username = "";
let socket_list = {};
let msg_list_map = {};

socket.on("connect", () => {
    sessionStorage.setItem("socket-id", socket.id);
    socket_list["UserID"] = socket.id;
    
    /*const engine = socket.io.engine;

    engine.once("upgrade", () => {
        // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
    });

    engine.on("packet", ({ type, data }) => {
        // called for each packet received
    });
    
    engine.on("packetCreate", ({ type, data }) => {
        // called for each packet sent
    });
    
    engine.on("drain", () => {
        // called when the write buffer is drained
    });
    
    engine.on("close", (reason) => {
        // called when the underlying connection is closed
    });*/
});

const newUser = (USER) => {
    username = USER || `User${Math.floor(Math.random() * 10000000)}`;
    socket.emit("new user", username);
    addToUsersBox(username);
};

socket.on("new user", function (data, list) {
    ub_user_list_box.innerHTML = "";
    msg_list_map = {};
    socket_list["All"] = []

    data.map((user) => {
        socket_list.All[socket_list["All"].length] = list[user];
        if(list[user] !== socket_list["UserID"]){
            addToUsersBox(user, list[user]);
            msg_list_map[list[user]] = [];
        }else{
            console.log("USERNAME: " + user + "\nID: " + socket_list["UserID"]);
        }
    });
});

socket.on("disconnected", function (userName) {
    removeUserBox(userName);
});