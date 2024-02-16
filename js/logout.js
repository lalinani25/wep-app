const createLogoutBtn = document.querySelector('#logout');

createLogoutBtn.addEventListener('click', async function (event){

    const token = localStorage.getItem("token");

    const url = "https://studdy-buddy-api-server.azurewebsites.net/user/logout"
    console.log(url)

    const options = {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`}
    }


    let response = await fetch(url, options)

    console.log(response)
    console.log(response.status)

    console.log('fetch returned')

    if (response.status === 200) {
        console.log("logged out successfully.")
        localStorage.removeItem(token);
        location.href = "index.html"
    }
    else if (response.status === 401) {
        console.log('failed to log out')
        document.querySelector("#errorMssg").innerHTML = "Could not log out."
    }

})