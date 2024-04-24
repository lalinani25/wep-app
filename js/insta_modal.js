const token = localStorage.getItem("token");
console.log("token: " + token)
const user = localStorage.getItem("user");
const mssg = document.getElementById("p2");
const p = document.getElementById("p1");
let u = JSON.parse(user)
console.log(u.ig_username)

if((u.ig_username!= "" || u.ig_password != "") && ( u.ig_username!= undefined || u.ig_password != undefined) ){
    p1.innerHTML = "Instagram information already exists!"
}

document.getElementById("save_insta").addEventListener('click', async function (event) {

    const url = `https://studdy-buddy-api-server.azurewebsites.net/user/insta`
    console.log(url)

    let insta_username = document.getElementById("insta_username");
    let insta_password = document.getElementById("insta_password");
    let insta_username_value = insta_username.value
    let insta_password_value = insta_password.value
    console.log(insta_username_value)
    console.log(insta_password_value)

    let insta_info = {
        ig_username: insta_username_value,
        ig_password: insta_password_value
    }

    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(insta_info),
    }

    let response = await fetch(url, options)

    if (response.ok) {
        mssg.innerHTML = 'Instagram info was successfully saved!';
        mssg.style.color = 'white'
        console.log(insta_info)
        console.log(user)

    } else {
        const errorData = await response.json();
        mssg.innerHTML = "Error: " + errorData.message;
        mssg.style.color = 'red';
    }

    const url1 = "https://studdy-buddy-api-server.azurewebsites.net/user/insta-post"
    console.log(url1)

    let image_url = "https://thankful-plant-0f567c30f.4.azurestaticapps.net/images/study-buddy.jpg"
    console.log(image_url)
    let caption = "New Study Group Created!"
    console.log(caption)

    const data = {
        image_url: image_url,
        caption: caption
    }
    console.log(data)

    const body = JSON.stringify(data)
    console.log(body)

    const options1 = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body
    }

    console.log('calling fetch')

    let response1 = await fetch(url1, options1)

    console.log(response1)
    console.log(response1.status)

    console.log('fetch returned')

    if (response1.status === 200) {
        console.log("logged in successfully.")
        const body = await response.json();
        console.log(body)
        console.log(JSON.stringify(body.user))

    }
    else {
        console.log("failed to post to Instagram!")
    }
})