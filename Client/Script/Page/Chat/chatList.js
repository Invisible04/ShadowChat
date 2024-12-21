// Initialized
const cl_chat_list = document.querySelector(".chat-list-box");

// Setup
let CL_Config = {
    
}

// Call [Function]
function clearMsgCache(){
    Object.keys(msg_list_map).forEach(key => {
        msg_list_map[key] = [];
    });
}

function loadMsg(msgMap){
    
}

// Run

// Action

// Debug
const CL_DEBUG_STORE = {};

const CL_DEBUG = {
    createFakeMsg: () => {
        let randomChoose = Math.round(Math.random() * (socket_list.All.length -2));
        let numOfMsg = 10;
        let allID = [];
        let ID = {
            targetID: "",
            userID: ""
        };
        let msgSet = [
            "Test!",
            "This is test message!",
            "Hello!",
            "Hi!",
            "Apa Khabar!",
            "Good Morning!",
            "Good Afternoon!",
            "Good Night!",
            "Selamat Pagi!",
            "Selamat Petang!",
            "Selamat Malam!",
            "Assalammualaikum!",
            "Sejahteralah ke atas kamu!",
        ]

        socket_list.All.forEach(Item => {
            if(Item != socket_list["UserID"]){
                allID.push(Item)
            }
        });

        if(Object.keys(socket_list.All).length > 1){
            allID[1] = allID[randomChoose];
            allID[0] = socket_list["UserID"];
            ID.userID = allID[0];
            ID.targetID = allID[1];

            for(let i = 0;i < numOfMsg;i++){
                let randomNum = Math.round(Math.random());
                let msgRandomNum = (Math.round(Math.random() * msgSet.length) - 1);

                msgRandomNum = msgRandomNum < 0 ? msgRandomNum + 1 : msgRandomNum;

                msg_list_map[targetID][i] = {
                    id: allID[randomNum],
                    msg: msgSet[msgRandomNum]
                }
            }
        }

        return ID;
    },

    forceSelectUser: (id) => {
        const element = document.querySelector(".chatbox-" + id);

        selectUser(element);
    },

    createMsg: () => {
        let msgPack = msg_list_map;

        console.log(msg_list_map);
        
    }
    
    /**
     * NOTE HERE!
     * - Create debug for fake chat list & msg
     * - Create injector fake chat into list
     * - Use debug store properly
     */
}