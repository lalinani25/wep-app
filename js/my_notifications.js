const token = localStorage.getItem("token");
console.log("token: " + token)
const user = localStorage.getItem("user");
let realUserId
let user_id


document.getElementById("myNotificationsButton").addEventListener('click', async function (event) {

    console.log("MyNOTIFICATIONS")
    const token = localStorage.getItem("token");
    console.log(token)
    let currentUser = JSON.parse(user)
    let id = currentUser._id
    console.log(id)
    

    const url = `https://studdy-buddy-api-server.azurewebsites.net/notification/${id}`
    console.log(url)



    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }


    let response = await fetch(url, options)

    let data = []
    data = await response.json()

    for(let i = 0; i < data.length; i++){
        delete data[i]._id
        delete data[i].sender
        delete data[i].receiver
        delete data[i].is_read
    }
    

    console.log(data)
    console.log(response.status)

    if (response.status === 200) {
        for(let i = 0; i < data.length; i++){
            let notifications = '<div class="notifications">'
            let subject = '<p class="not_subject">'+ data[i].subject+'</p>'
            notifications+=subject
            let body = '<p class="not_body">'+ data[i].body+'</p>'
            notifications+=body
            notifications+='</div>'
            document.body.innerHTML += notifications;
        }
    }
    else if (response.status === 401) {
    }

})