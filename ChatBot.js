
const chatBody = document.querySelector(".chat-body");
const inputMsg = document.querySelector(".input-message");
const sendMsgBtn = document.querySelector("#send-message");

//const API_KEY = "****************";
const API_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=**********************`;

const userData = {
    message: null
}

const handleOutgoingMsg = (e)=>{
    e.preventDefault();
    userData.message = inputMsg.value.trim();
    inputMsg.value="";
    const div = document.createElement("div");
    div.classList.add("user-side-message");
    div.textContent = userData.message;
    chatBody.appendChild(div);

    setTimeout(()=>{
        const botDiv = document.createElement("div");
        botDiv.classList.add("bot-side-message");
        botDiv.innerHTML = `<img src="bot.png" alt="" class="bot-avatar">
                <div class="bot-message">
                    <div class="think">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;
                chatBody.appendChild(botDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
    }, 500)
    chatBody.scrollTop = chatBody.scrollHeight;
};

const generateBotResponse = async ()=>{
    try {
        const response = await fetch(API_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userData.message}]
                }]
            })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message)
            console.log(data);
    } catch (error){
        console.log(error)
    }
}
generateBotResponse();
inputMsg.addEventListener("keydown", (e)=>{
    const textMsg = e.target.value.trim();
    if(e.key==="Enter" && textMsg){
        handleOutgoingMsg(e);
    }
});

sendMsgBtn.addEventListener("click", (e)=>{
    handleOutgoingMsg(e);
});
