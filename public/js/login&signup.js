const loginOrSignUp = $("#signupButton");


loginOrSignUp.on("click", async () => {
    let userName = $("#usernameInput").val().trim();
    let password = $("#passwordInput").val().trim();
    if (userName == "" || password == "") {
        return;
    }
    console.log(userName);
    console.log(password);
    if (loginOrSignUp.text() == "Sign Up!") {
        const response = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({userName, password}),
            headers: { "Content-Type": "application/json" }
        })
        if (response.ok) {
            location.pathname = "/dashboard";
        }
    }
    if (loginOrSignUp.text() == "Login!") {
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({userName, password}),
            headers: { "Content-Type": "application/json" }
        })
        await response.json();
        if (!response.ok) {
            alert("Error, Username or Password is incorrect");
        }
        else {
            alert("Successful login!");
            location.pathname = "/homepage";
        }
    }
})
