const sendChatBtn = document.querySelector(".chat-input #send-btn");
const chatInput = document.querySelector(".chat-input textarea");
const chatBox = document.querySelector(".chatbox");
let userMessage;
const API_KEY = "'Enter your api key here'";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let charContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">toys</span><p>${message}</p>`;
    chatLi.innerHTML = charContent;
    return chatLi;
}

let incomingChatli; 

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatli.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}` 
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-0613",
            messages: [{ role: "user", content: userMessage }]
        }) 
    };
 
    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content; 
        })
        .catch((error) => {
            messageElement.textContent = "Oops something went wrong";
        });
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatBox.append(createChatLi(userMessage, "outgoing"));

    incomingChatli = createChatLi("Thinking", "incoming");
    chatBox.append(incomingChatli);

    setTimeout(() => {
        generateResponse();
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
