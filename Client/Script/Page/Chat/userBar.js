// Initialized
const ub_user_list_box = document.querySelector(".chat-list-box");
const ub_chat_interface = document.querySelector(".rsb-chatbox");

// Setup
let UB_Config = {
    
}

let UB_HTML = {
    user: (USERNAME,ID) => {
        return `<div class="chatbox-${ID} items-box" onclick="selectUser(this)" id="${ID}">
                    <div class="chat-profile-picture-box">
                        <div class="picture-box">
                            <img src="Interface/Icon/PNG/Flat_Color/016-user.png">
                        </div>
                    </div>
                    <div class="chat-info-box">
                        <div class="chat-name-box">
                            <p>${USERNAME}</p>
                            <div class="extra-icon">
                                <img src="Interface/Icon/SVG/Original/fi-br-volume-mute.svg">
                            </div>
                        </div>
                        <div class="chat-new-msg-box">
                            <div class="icon-msg-box">
                                <img src="Interface/Icon/SVG/Original/fi-br-play.svg">
                            </div>
                            <div class="text-msg-box">
                                <p>Hello! this is my new message for you. This message just testing message.</p>
                            </div>
                        </div>
                    </div>
                    <div class="chat-extra-box">
                        <div class="date-time-box">
                            <p>14:57</p>
                        </div>
                        <div class="icon-hint-box">
                            <img src="Interface/Icon/SVG/Original/fi-br-thumbtack.svg">
                        </div>
                    </div>
                </div>`;
    }
}

// Call [Function]
function addToUsersBox(USERNAME, ID){
    ub_user_list_box.innerHTML = ub_user_list_box.innerHTML + UB_HTML.user(USERNAME, ID);
};

function removeUserBox(USERNAME){
    document.querySelector(`.chatbox-${USERNAME}`).remove();
}

function selectUser(Element){
    const ElementID = Element.id;

    sessionStorage.setItem("target-id", ElementID);
    socket_list["TargetID"] = ElementID;

    document.querySelectorAll(".uib-selected").forEach(element => {
        element.classList.remove("uib-selected");
    });
    Element.classList.add("uib-selected");

    ub_chat_interface.hidden = false;
}

// Run
newUser();

// Action

// Debug