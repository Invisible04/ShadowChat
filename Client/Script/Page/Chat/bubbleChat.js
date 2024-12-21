// Initialized
const bc_msg_box = document.querySelector(".chat-bubble-list");
const bc_msg_sent_input = document.querySelector(".sm-hb-rsb-input");
const bc_msg_sent_btn = document.querySelector(".sm-hb-rsb-input-btn");

// Setup
let BC_Config = {
    
}

let BC_HTML = {
    "bubble_msg": {
        "sent": (num,msg,time) => {
            return `<div class="chat-${num} chat-bubble-box">
                        <div class="chat-bubble sent">
                            <p class="cb-sent-text">${msg}</p>
                            <p class="cb-sent-time">${time}</p>
                            <img class="cb-sent-tick-info readed" src="Interface/Icon/SVG/Original/fi-br-check-double.svg">
                        </div>
                    </div>`;
        },
        "receive": (num,msg,time) => {
            return `<div class="chat-${num} chat-bubble-box">
                        <div class="chat-bubble receive">
                            <p class="cb-receive-text">${msg}</p>
                            <p class="cb-receive-time">${time}</p>
                        </div>
                    </div>`;
        },
    }
}

// Call [Function]
function sentMsg(id,msg_text){
    if(msg_text !== null && msg_text != "" && msg_text != undefined){
        const dateModule = new Date();
        let currectTime = dateModule.getHours() + ":" + ("0" + dateModule.getMinutes()).slice(-2);
        
        bc_msg_box.innerHTML = bc_msg_box.innerHTML + BC_HTML.bubble_msg.sent(id,msg_text,currectTime);
        bc_msg_sent_input.value = "";
    }
}

function receiveMsg(id,msg_text){
    const dateModule = new Date();
    let currectTime = dateModule.getHours() + ":" + ("0" + dateModule.getMinutes()).slice(-2);

    bc_msg_box.innerHTML = bc_msg_box.innerHTML + BC_HTML.bubble_msg.receive(id,msg_text,currectTime);
}

function newMsg({user,msg,target}){
    if(user === socket_list["UserID"]){
        sentMsg(user,msg);

        msg_list_map[target].push({
            id: user,
            text: msg
        });
    }else if(target === socket_list["UserID"]){
        receiveMsg(user,msg);

        msg_list_map[user].push({
            id: user,
            text: msg
        });
    }
}

function submitMsg(event){
    event.preventDefault();
    if(!bc_msg_sent_input.value){
        return;
    }

    socket.emit("message", {
        message: bc_msg_sent_input.value,
        user: socket_list["UserID"],
        target: socket_list["TargetID"]
    });

    bc_msg_sent_input.value = "";
}

// Run
socket.on("message", function (data) {
    newMsg({ user: data.user, msg: data.message, target: data.target });
});

bc_msg_sent_btn.addEventListener("click", (event) => {
    submitMsg(event);
});

// Action
document.body.onkeydown = (event) => {
    switch (event.keyCode) {
        case 13:
            submitMsg(event);
            break;
    
        default:
            break;
    }

    //alert(event.key);
}

// Debug
const DEBUG = {
    insert_bubble_chat_receive: () => {
        const dateModule = new Date();
        let currectTime = dateModule.getHours() + ":" + ("0" + dateModule.getMinutes()).slice(-2);

        bc_msg_box.innerHTML = bc_msg_box.innerHTML + BC_HTML.bubble_msg.receive(0,"This is receive message!",currectTime);
    },
    insert_bubble_chat_sent: () => {
        const dateModule = new Date();
        let currectTime = dateModule.getHours() + ":" + ("0" + dateModule.getMinutes()).slice(-2);

        bc_msg_box.innerHTML = bc_msg_box.innerHTML + BC_HTML.bubble_msg.sent(0,"This is receive message!",currectTime);
    }
}

// End