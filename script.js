var validTokens = [];






function checkToken() {
    var token = document.getElementById("tokenInput").value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://discord.com/api/v9/users/@me", true);
    xhr.setRequestHeader("Authorization", token);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var username = response.username;
                document.getElementById("result").innerHTML = "Valid token";
                document.getElementById("tokenInput").classList.add("valid");
                document.getElementById("tokenInput").classList.remove("invalid");
                validTokens.push({ token: token, username: username });
                displayValidTokens();
                displayConfirmationMessage();
            } else {
                document.getElementById("result").innerHTML = "Invalid Token.";
                document.getElementById("tokenInput").classList.add("invalid");
                document.getElementById("tokenInput").classList.remove("valid");
            }
        }
    };
    xhr.send();
}

function displayValidTokens() {
    var tokensList = document.getElementById("tokensList");
    tokensList.innerHTML = "";
    for (var i = 0; i < validTokens.length; i++) {
        var tokenItem = document.createElement("li");
        tokenItem.textContent = validTokens[i].token + " (User: " + validTokens[i].username + ")";
        tokenItem.id = "tokenItem-" + i; // 
        tokenItem.addEventListener("click", function() {
            showTokenInfo(this.id);
        });
        tokensList.appendChild(tokenItem);
    }
}

function showTokenInfo(tokenId) {
    var tokenIndex = tokenId.split("-")[1];
    var token = validTokens[tokenIndex].token;
    var username = validTokens[tokenIndex].username;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://discord.com/api/v9/users/@me", true);
    xhr.setRequestHeader("Authorization", token);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var profilePicture = response.avatar ? "https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".png" : "https://discord.com/assets/1f0bfc0865d324c2587920a7d80c609b.png";
                var banner = response.banner ? "https://cdn.discordapp.com/banners/" + response.id + "/" + response.banner + ".png" : "";
                var hasNitro = response.premium_type === 2 ? "Active" : "False";
                var email = response.email ? response.email : "False";
                var phoneNumber = response.phone ? response.phone : "False";

                var tokenInfo = "<div class='token-info'>";
                tokenInfo += "<p class='ani' >Benutzername: " + username + "</p>";
                
                tokenInfo += "<p class='pb' ><img src='" + profilePicture + "'></p>";
                tokenInfo += "<p><img src='" + banner + "'></p>";
                tokenInfo += "<p class='mitglied' >Nitro subscription: " + hasNitro + "</p>";
                tokenInfo += "<p class='ani' >E-Mail: " + email + "</p>";
                tokenInfo += "<p class='ani' >Phonenumber: " + phoneNumber + "</p>";
                tokenInfo += "</div>";

                var newWindow = window.open("", "_blank");
                newWindow.document.write("<html><head><title>Token Information</title><link rel='stylesheet' type='text/css' href='info.css'></head><body>" + tokenInfo + "</body></html>");
            }
        }
    };
    xhr.send();
}

function displayConfirmationMessage() {
    var confirmationMessage = "";
    document.getElementById("confirmation").innerHTML = confirmationMessage;
}

