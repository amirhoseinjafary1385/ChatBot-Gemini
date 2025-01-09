// //API = ApiKey
const API_KEY = "ApiKey"
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;



// DOM Elements
const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion-list .suggestion");
const toggleTheme = document.querySelector("#toggle-theme-button");
const DeleteChatButton = document.querySelector("#delete-chat-button");

// State Variables
let userMessage = null;
let isResponsingGeneratings = false;

// Load Local Storage Data
const loadLocalstorageData = () => {
    const savedChats = localStorage.getItem("savedChats");
    const isLightMode = localStorage.getItem("themeColor") === "light_mode";

    // Apply Theme
    document.body.classList.toggle("light_mode", isLightMode);
    toggleTheme.innerText = isLightMode ? "dark_mode" : "light_mode";

    // Restore Saved Chats
    chatList.innerHTML = savedChats || "";
    chatList.scrollTo(0, chatList.scrollHeight);
};

loadLocalstorageData();

// Create Message Element
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

// Typing Effect
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
    const words = text.split(" ");
    let currentWordIndex = 0;

    const typingInterval = setInterval(() => {
        textElement.innerHTML +=
            (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex++];

        if (currentWordIndex === words.length) {
            clearInterval(typingInterval);
            isResponsingGeneratings = false;
            incomingMessageDiv.querySelector(".icon").classList.remove("hide");
            localStorage.setItem("savedChats", chatList.innerHTML);
        }

        chatList.scrollTo(0, chatList.scrollHeight);
    }, 75);
};


let questionCount = 0;

// Helper function to check if a message is a question
const isQuestion = (message) => {
    // Ensure the message is a string
    return typeof message === "string" && message.trim().endsWith("?");
};



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
                        //content: userMessage
                        parts: [{text: userMessage}],
                    }]
                })
            });
    
        
    

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        const apiResponse = data?.candidates[0]?.content?.parts[0]?.text.replace(
            /\*\*(.*?)\*\*/g,
            "$1"
        );
        showTypingEffect(apiResponse, textElement, incomingMessageDiv);
    } catch (error) {
        textElement.innerText = error.message;
        textElement.classList.add("error");
    } finally {
        incomingMessageDiv.classList.remove("loading");
        isResponsingGeneratings = false;
    }
};

// Show Loading Animation
const showLoadingAnimation = () => {
    const html = `
        <div class="message-content">
            <img src="../images/gemini.svg" alt="Gemini Image" class="avatar">
            <p class="text"></p>
            <div class="loading-indicator">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
            </div>
        </div>
        <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>
    `;

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    generateAPIResponse(incomingMessageDiv);
};

// Copy Message
const copyMessage = (copyIcon) => {
    const messageText = copyIcon.parentElement.querySelector(".text").innerText;
    navigator.clipboard.writeText(messageText);

    copyIcon.innerText = "done";
    setTimeout(() => (copyIcon.innerText = "content_copy"), 1000);
};

// Handle Outgoing Chat
const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;
    if (!userMessage || isResponsingGeneratings) return;

    isResponsingGeneratings = true;

    const html = `
        <div class="message-content">
            <img src="images/user.jpg" alt="User Image" class="avatar">
            <p class="text"></p>
        </div>
    `;

    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessage;
    chatList.appendChild(outgoingMessageDiv);

    typingForm.reset();

    setTimeout(showLoadingAnimation, 600);
};

// Set Suggestion Text Prompts
suggestions.forEach((suggestion) => {
    suggestion.addEventListener("click", () => {
        userMessage = suggestion.querySelector(".text").innerText;
        handleOutgoingChat();
    });
});

// Toggle Light and Dark Mode
toggleTheme.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light_mode");
    localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
    toggleTheme.innerText = isLightMode ? "dark_mode" : "light_mode";
});

// Delete Chat
DeleteChatButton.addEventListener("click", () => {
    if (confirm("آیا مایل به حذف صفحه هستید؟...")) {
        localStorage.removeItem("savedChats");
        chatList.innerHTML = "";
    }
});

// Prevent Default Submission and Handle Outgoing Chat
typingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
});

