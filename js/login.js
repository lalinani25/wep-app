document.querySelector("#login").addEventListener('click', async () => {

    const url = "https://studdy-buddy-api-server.azurewebsites.net/user/login"

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        email: email.value,
        password: password.value
    }

    const body = JSON.stringify(data)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        console.log("Tou have successfully logged in.")
        const body = await response.json();

        localStorage.setItem("user", JSON.stringify(body.user));
        localStorage.setItem("token", body.token);

        location.href = "main.html"
    }
    else if (response.status === 401) {
        console.log('You gave failed to log in. Please try again.')
        document.querySelector("#errorMssg").innerHTML = "Email has not been validated."
    }
    else {
        console.log("There is an error when trying to log in.")
        document.querySelector("#errorMssg").innerHTML = "Invalid credentials."
    }

    email.value = ''
    password.value = ''
    document.querySelector("#errorMssg").innerHTML = ''

})