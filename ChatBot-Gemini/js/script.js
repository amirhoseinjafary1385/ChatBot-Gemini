//API = "YOur APi Gemini Key  ai.google.dev"
 
const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
const toggleTheme = document.querySelector("#toggle-theme-button");


//*API Config*
const API_KEY = "";

const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}


const showTypingEffect = (text, textElement) => {
    const words = text.split(' ');
    let currentWordIndex = 0;

    const typingInterval = setInterval(() => {

        textElement.innerHTML += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];


        if(currentWordIndex === words.length) {
            clearInterval(typingInterval);
        }
    }, 75);
}


const generateAPIResponse = async (incomingMessageDiv) => {
const textElement = incomingMessageDiv.querySelector(".text");//گرفتن هنصر حروف
    try {
        const response = await fetch(API_URL, {
        //POST
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{text: userMessage}],
                }]
            })
        });


    const data = await response.json();
        const apiResponse = data?.candidates[0].content.parts[0].text;
        textElement.innerText = apiResponse;
        
        showTypingEffect = (apiResponse, textElement);
        //console.log(apiResponse)
    } catch (error) {
        console.log(error);
    } finally {
        incomingMessageDiv.classList.remove("loading");
    }
}
let userMessage = null;

//Show a loading Animation While waiting for a response...
const showLoadingAnimation = () => {
    const html = `  <div class="message-content">
            <img src="../images/gemini.svg" alt="Gemini Image" class="avatar">
            <p class="text"></p>
            <div class= "loading-indicator">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
            </div>
        </div>
        <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`

//Important Copy !

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);
    //Api Gemini BArd Google Generating

    generateAPIResponse(incomingMessageDiv);   
}
//Important Copy !

const copyMessage = (copyIcon) => {
    //کپی کردن حروف در کلیپ بورد هر سیستمی
    const messageText = copyIcon.parentElement.querySelector(".text").innerText;

    navigator.clipboard.writeText(messageText);
    //نماد تیک را نشان دهید 
    copyIcon.innerText = "done";
    //پس از 1 ثانیه نماد را برگردانید
    setTimeout(() => copyIcon.innerText = "content_copy", 1000)
}

toggleTheme.addEventListener("click", () => {
const isLightMode = document.body.classList.toggle("light_mode");
    toggleTheme.innerText  = isLightMode ? "dark_mode" : "light_mode";
});

const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim();
    //Exit if there message
    if(!userMessage) return;

    const html = ` <div class="message-content">
                <img src="../images/user.jpg" alt="User Image" class="avatar">
                <p class="text"></p>
                </div>`
// console.log(userMessage);
    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessage;
    chatList.appendChild(outgoingMessageDiv);
    
    typingForm.reset();
    setTimeout(showLoadingAnimation, 500);
}

// Prevent default submission,  and  handle outGoing chat

typingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    handleOutgoingChat();
});
