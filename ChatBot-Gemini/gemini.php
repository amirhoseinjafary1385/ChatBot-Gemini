


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gemini-ChatBot</title>
    <link rel="stylesheet" href="../css/style.css">
    <!-- favIcon -->
    <link rel="icon" type="images/x-icon" href="../images/gemini.svg">
    <!-- Google Fonts | گوگل فونت -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>
<body>

<header class="header">
    <!-- خوش آمد گویی... -->
    <h2 class="title">Hello, EveryBody...</h2>
    <h5 class="subtitle">How can i assist you today?...</h5>

    <ul class="suggestion-list">
        <li class="suggestion">
            
            <h4 class="text">Help me to create creative painting...</h4>
            <span class="icon material-symbols-rounded">brush</span>
        </li>
        
        <li class="suggestion">
            
            <h4 class="text">what are the best tips to improve my Skill... </h4>
            <span class="icon material-symbols-rounded">lightbulb</span>
        </li>
        <li class="suggestion">
            
            <h4 class="text">Write Javascripts Code for Moving the car...</h4>
            <span class="icon material-symbols-rounded">explore</span>
        </li>
        <li class="suggestion">
            
            <h4 class="text">Introducing Dark-Souls-4 Talk...</h4>
            <span class="icon material-symbols-rounded">code</span>
        </li>
        
    </ul>
</header>

<!-- Chat-List -->
<div class="chat-list"></div> 

<!-- Typing-Area -->
<div class="typing-area">
    <form action="#" class="typing-form">
        <div class="input-wrapper">
            <input type="text" class="typing-input" placeholder="Type Somethings..." required>
        </div>
        <button class="icon material-symbols-rounded">send</button>

        <div class="action-buttons">
            <span id="toggle-theme-button" class="icon material-symbols-rounded">light_mode</span>
            <span class="icon material-symbols-rounded">delete</span>
        </div>
</form>
<p style="text-align: center;" class="disclaimer-text"> Gemini may display incarrute info, including about people, so double-check its responses...</p>
</div>
    

<script src="../js/script.js"></script>
</body>
</html>