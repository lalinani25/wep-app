const search_btn = document.querySelector('#search_btn');
const user = localStorage.getItem("user");
const message = document.querySelector("p");
const token = localStorage.getItem("token");
const mssg = document.querySelector("p");


let studygroup_modal;
let participants = [];
let add;
let remove;
let data1 = []
let array = []
let my_array = []
let notificationBtn = []
let p_info = []
let index
search_btn.addEventListener('click', async function (event) {

    //fetching the data for studygroups
    async function searchStudygroups() {



        console.log("search")
        let url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?`
        console.log(url)

        //updating url to search studygroups based on criterias(ongoing, sortBy, skip, owner, member etc)
        const ongoing = document.querySelector("#ongoing")
        console.log(ongoing.value)
        const sortBy = document.querySelector("#sortBy")
        console.log(sortBy.value)
        const search = document.querySelector("#search")
        console.log(search.value)
        const skip = document.querySelector("#skip")
        console.log(skip.value)

        const owner = document.querySelector("#owner")
        console.log(owner.value)

        const member = document.querySelector("#member")
        console.log(owner.value)

        const studyGroupSearchData = {
            ongoing: ongoing.value,
            sortBy: sortBy.value,
            search: search.value,
            skip: skip.value,
            owner: owner.value
        }
        console.log(studyGroupSearchData)

        console.log("searching")

        const h1 = document.querySelector("h1")
        const p = document.querySelector("p")

        if (!token) {
            h1.innerHTML = "Something went wrong."
            p.innerHTML = "Please try again!"

            console.log("No token found")

            return
        }

        console.log("test")
        if (skip.value == "") {
            if (ongoing.value == "true" || ongoing.value == "false") {
                console.log("ongoing" + ongoing.value)
                if (sortBy.value === "asc" || sortBy.value === "desc") {
                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&sortBy=name:${sortBy.value}&limit=${5}`
                    console.log(url)

                    if (search.value != "") {
                        url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&sortBy=name:${sortBy.value}&search=${search.value}&limit=${3}`
                        console.log(url)
                    }
                }
                else if (search.value != "") {
                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&search=${search.value}&limit=${3}`
                    console.log(url)
                }
                else url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&limit=${3}`
                console.log(url)
            }

            else if (sortBy.value == "asc" || sortBy.value == "desc") {
                if (search.value == "") {
                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?sortBy=name:${sortBy.value}&limit=${3}`
                    console.log(url)
                }
                else url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?sortBy=name:${sortBy.value}&search=${search.value}&limit=${3}`
                console.log(url)
            }

            else if (ongoing.value == "" && sortBy.value == "" && search.value != "") {
                url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?search=${search.value}&limit=${3}`
                console.log(url)
            }
        }



        else if (skip.value != "") {
            if (ongoing.value == "true" || ongoing.value == "false") {
                console.log("ongoing" + ongoing.value)
                if (sortBy.value === "asc" || sortBy.value === "desc") {
                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&sortBy=name:${sortBy.value}&limit=${5}&skip=${skip.value}`
                    console.log(url)
                    if (search.value != "") {
                        url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&sortBy=name:${sortBy.value}&search=${search.value}&limit=${3}&skip=${skip.value}`
                        console.log(url)
                    }
                }
                else if (search.value != "") {
                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&search=${search.value}&limit=${3}&skip=${skip.value}`
                    console.log(url)
                }
                else url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&limit=${3}&skip=${skip.value}`
                console.log(url)
            }

            else if (sortBy.value == "asc" || sortBy.value == "desc") {
                if (search.value == "") {
                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?sortBy=name:${sortBy.value}&limit=${3}&skip=${skip.value}`
                    console.log(url)
                }
                else url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?sortBy=name:${sortBy.value}&search=${search.value}&limit=${3}&skip=${skip.value}`
                console.log(url)
            }

            else if (ongoing.value == "" && sortBy.value == "" && search.value != "") {
                url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?search=${search.value}&limit=${3}&skip=${skip.value}`
                console.log(url)

            }
            else {
                url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?limit=${3}&skip=${skip.value}`
                console.log(url)
            }
        }


        //GET method to get the data of the studygroups
        console.log(url)
        try {
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },

            });


            if (response.status == 200) {


                let data = []
                data = await response.json()

                console.log(data)
                array = data
                console.log(array)


                for (let i = 0; i < array.length; i++) {
                    console.log("array.owner: " + array[i].owner)
                    console.log("user: " + user)
                    let user_id = JSON.parse(user)
                    console.log("user_id: " + user_id)
                    let realUserId = JSON.stringify(user_id._id);
                    console.log("realUserId: " + realUserId)



                    if (JSON.stringify(array[i].owner) === realUserId) {

                        array[i].editBtn = "<button class = 'editBtn' id = 'editBtn" + i + "'>" + "SAVE" + "</button>"
                        array[i].deleteBtn = "<button class = 'deleteBtn' id = 'deleteBtn" + i + "'>" + "DELETE" + "</button>"

                    }


                }

                //Getting the data of the participants in Studygroups
                for (let j = 0; j < array.length; j++) {

                    let url1 = `https://studdy-buddy-api-server.azurewebsites.net/user/${array[j]._id}`
                    console.log(url1)
                    try {
                        let response = await fetch(url1, {
                            method: 'GET',
                            headers: {
                                "Authorization": `Bearer ${token}`
                            },

                        })
                        if (response.ok) {

                            data1 = await response.json()
                            console.log(data1)
                        }

                    } catch (error) {
                        mssg.innerHTML = "Error: An error occurred";
                        mssg.style.color = 'red';
                    }



                    console.log(array[j])

                    console.log("array.owner: " + array[j].owner)
                    console.log("user: " + user)
                    let user_id = JSON.parse(user)
                    console.log("user_id: " + user_id)
                    let realUserId = JSON.stringify(user_id._id);
                    console.log("realUserId: " + realUserId)

                    //Displaying studygroups owned by user
                    if (JSON.stringify(array[j].owner) === realUserId && (owner.value == "" || owner.value == "true") && (member.value == "" || member.value != "true")) {

                        studygroup_modal = '<div id="studygroup_modal">'

                        let name = '<p display="inline-block" class ="name" id = "name' + j + '" contentEditable="true">' + array[j].name + '</p>'
                        studygroup_modal += name
                        console.log(name)

                        let is_public = '<p class ="is_public" id = "is_public' + j + '" contentEditable="true" >' + array[j].is_public + '</p>'
                        studygroup_modal += is_public

                        let o = data1[0].owner
                        let owner = '<p class="owner"  id = "owner_name' + j + '" >' + o.username + '</p>'
                        studygroup_modal += owner

                        participants = array[j].participants

                        let max_participants = '<p class ="max_participants" id = "max_participants' + j + '" contentEditable="true">' + participants.length + '/' + array[j].max_participants + '</p>'
                        studygroup_modal += max_participants

                        let participant = '<div id="participants">PARTICIPANTS LIST:<br> <br>'


                        if (!(participants.length === 0)) {

                            for (let k = 0; k < data1.length; k++) {
                                console.log(data1[k])
                                let p = []
                                p = data1[k].participants
                                p_info.push(p)
                                console.log(p_info)
                                index = p_info.indexOf(p)
                                console.log(index)
                                p.messageBtn = '<button class = "notificationBtn" id = "notificationBtn' + index + '" style="font-size:24px display:inline">&#9993;</button>'
                                p.messageBtnId = 'notificationBtn' + p._id
                                participant += '<p style=" display:inline" id = "p_name' + j + '" >' + p.username + '</p>' + p.messageBtn + ' <br><br>'
                            }
                        } else {
                            participant += '<p id = "p_name">There are no participants in this studygroup!</p>'
                        }

                        participant += '</div>'
                        studygroup_modal += participant

                        let st_date = array[j].start_date
                        let final_date = st_date.split("T", 1)[0]
                        console.log(final_date)
                        let start_date = '<p class ="start_date" id = "start_date' + j + '" contentEditable="true" >' + final_date + '</p>'
                        studygroup_modal += start_date

                        let en_date = array[j].end_date
                        let fin_date = en_date.split("T", 1)[0]
                        console.log(final_date)
                        let end_date = '<p class ="end_date" id = "end_date' + j + '" contentEditable="true" >' + fin_date + '</p>'
                        studygroup_modal += end_date

                        let school = '<p class ="school" id = "school' + j + '" contentEditable="true" >' + array[j].school + '</p>'
                        studygroup_modal += school

                        let description = '<p class ="description" id = "description' + j + '" contentEditable="true" >' + array[j].description + '</p>'
                        studygroup_modal += description

                        let course_number = '<p class ="cource_number" id = "course_number' + j + '" contentEditable="true" >' + array[j].course_number + '</p>'
                        studygroup_modal += course_number

                        let arr = array[j].meeting_times
                        console.log(arr)
                        let meeting_times = '<div id="meeting_times">MEETING TIMES'
                        for (let k = 0; k < arr.length; k++) {
                            meeting_times += '<p class ="day" id = "day' + j + '" contentEditable="true" >' + arr[k].day + '</p>' + '<p class ="time" id = "time' + j + '" contentEditable="true">' + arr[k].time + '</p>' +
                                '<p class ="location" id = "location' + j + '" contentEditable="true"> ' + arr[k].location + '</p>'

                        }

                        array[j].addMeetingInfo = '<button type="button" class="addMeetingInfo' + j + '" id="addMeetingInfo' + j + '"> + </button>'

                        let addMeetingInfo = array[j].addMeetingInfo

                        meeting_times += addMeetingInfo

                        meeting_times += '</div>'
                        studygroup_modal += meeting_times


                        let editBtn = array[j].editBtn
                        studygroup_modal += editBtn

                        let deleteBtn = array[j].deleteBtn
                        studygroup_modal += deleteBtn

                        studygroup_modal += '</div>'
                        console.log(studygroup_modal)
                        document.body.innerHTML += studygroup_modal;

                    }

                    //Displaying studygroups owned by others
                    else if (JSON.stringify(array[j].owner) != realUserId && (owner.value == "" || owner.value == "false")) {

                        studygroup_modal = '<div id="studygroup_modal">'
                        let name = '<p display="inline-block" class ="name" id = "name">' + array[j].name + '</p>'
                        studygroup_modal += name
                        console.log(name)

                        let is_public = '<p class ="is_public" id = "is_public" >' + array[j].is_public + '</p>'
                        studygroup_modal += is_public

                        let o = data1[0].owner
                        p_info.push(o)
                        index = p_info.indexOf(o)
                        o.messageBtn = '<button style=" display:inline" class = "notificationBtn" id = "notificationBtn' + index + '" style="font-size:24px display:inline">&#9993;</button>'
                        /*     for(let m = 0; m < p_info.length; m++){
                                 console.log(p_info[m])
                                 console.log(o)
                                 if(p_info[m]._id == o._id){
                                     console.log("already there")
                                 }
                                 else{
                                     p_info.push(o)
                                 }
                             }
                             */
                       
                        let owner = '<p class="owner" style=" display:inline" id = "owner_name' + j + '" >' + o.username + '</p>' + o.messageBtn + '<br>'
                        studygroup_modal += owner

                        console.log(o)




                        participants = array[j].participants

                        let max_participants = '<p class ="max_participants"  id = "max_participants">' + participants.length + '/' + array[j].max_participants + '</p>'
                        '<p id = "p_name">' + participants.length + '/' + array[j].max_participants + '</p>'
                        studygroup_modal += max_participants



                        console.log(participants)
                        let participant = '<div id="participants">PARTICIPANTS LIST:<br><br>'

                        let is_User;

                        for (let k = 0; k < participants.length; k++) {
                            if (realUserId == JSON.stringify(array[j].participants[k])) {
                                is_User = true
                            }
                        }

                        if (!(participants.length === 0) && (is_User == true) && (array[j].is_public == true)) {

                            for (let k = 0; k < data1.length; k++) {
                                console.log(data1[k])
                                let p = []
                                p = data1[k].participants
                                p_info.push(p)
                                index = p_info.indexOf(p)
                                p.messageBtn = '<button class = "notificationBtn" id = "notificationBtn' + index+ '" style="font-size:24px display:inline">&#9993;</button>'
                                p.messageBtnId = 'notificationBtn' + p._id
                                participant += '<p style=" display:inline" id = "p_name' + j + '" >' + p.username + '</p>' + p.messageBtn + '<br><br>'
                            }

                        }
                        else if (!(participants.length === 0) && (is_User != true) && (array[j].is_public == true)) {
                            for (let k = 0; k < data1.length; k++) {
                                console.log(data1[k])
                                let p = []
                                p = data1[k].participants
                                p_info.push(p)
                                index = p_info.indexOf(p)
                                p.messageBtn = '<button class = "notificationBtn" id = "notificationBtn' + index + '" style="font-size:24px display:inline">&#9993;</button>'
                                p.messageBtnId = 'notificationBtn' + p._id
                                participant += '<p style=" display:inline"  id = "p_name' + j + '" >' + p.username + '</p>' + p.messageBtn + '<br>'
                            }
                        }
                        else if (!(participants.length === 0) && (is_User == true) && (array[j].is_public == false)) {
                            for (let k = 0; k < data1.length; k++) {
                                console.log(data1[k])
                                let p = []
                                p = data1[k].participants
                                /*  for(let m = 0; m < p_info.length; m++){
                                      console.log(p_info[m])
                                      console.log(p)
                                      if(p_info[m]._id == p._id){
                                          console.log("already there")
                                      }
                                      else{
                                          p_info.push(p)
                                      }
                                  }
                                  */
                                p_info.push(p)
                                index = p_info.indexOf(p)
                                p.messageBtn = '<button class = "notificationBtn" id = "notificationBtn' + index+ '" style="font-size:24px display:inline">&#9993;</button>'
                                p.messageBtnId = 'notificationBtn' + p._id
                                participant += '<p style=" display:inline" id = "p_name' + j + '" >' + p.username + '</p>' + p.messageBtn + '<br><br>'
                            }
                        }
                        else if (!(participants.length === 0) && (is_User != true) && (array[j].is_public == false)) {
                            participant += '<p id = "p_name">Join group to see participants!</p>'
                        }
                        else if (participants.length === 0) {
                            participant += '<p id = "p_name">There are no participants in this studygroup!</p>'
                        }

                        participant += '</div>'
                        studygroup_modal += participant

                        let st_date = array[j].start_date
                        let final_date = st_date.split("T", 1)[0]
                        console.log(final_date)
                        let start_date = '<p class ="start_date" id = "start_date">' + final_date + '</p>'
                        studygroup_modal += start_date

                        let en_date = array[j].end_date
                        let fin_date = en_date.split("T", 1)[0]
                        console.log(final_date)
                        let end_date = '<p class ="end_date" id = "end_date">' + fin_date + '</p>'
                        studygroup_modal += end_date

                        let school = '<p class ="school" id = "school" >' + array[j].school + '</p>'
                        studygroup_modal += school

                        let description = '<p class ="description" id = "description" >' + array[j].description + '</p>'
                        studygroup_modal += description

                        let course_number = '<p class ="course_number" id = "course_number" >' + array[j].course_number + '</p>'
                        studygroup_modal += course_number

                        let arr = array[j].meeting_times
                        console.log(arr)
                        let meeting_times = '<div class ="meeting_times" id="meeting_times">MEETING TIMES'
                        for (let k = 0; k < arr.length; k++) {
                            meeting_times += '<p class ="day" id = "day" >' + arr[k].day + '</p>' + '<p class ="time" id = "time">' + arr[k].time + '</p>' +
                                '<p class ="location" id = "location"> ' + arr[k].location + '</p>'

                        }
                        meeting_times += '</div>'
                        studygroup_modal += meeting_times

                        let addBtn = []
                        console.log(JSON.stringify(array[j].participants))


                        for (let k = 0; k < participants.length; k++) {
                            if (realUserId == JSON.stringify(array[j].participants[k])) {
                                is_User = true
                            }
                        }
                        if ((((array[j].participants == undefined) || (is_User != true)) || member.value == "false") && (array[j].is_public == true)) {

                            array[j].addBtn = '<button type="button" class="add" id="add' + j + '"> JOIN </button>'
                            let addBtn = array[j].addBtn
                            studygroup_modal += addBtn
                            studygroup_modal += '</div>'
                            console.log(studygroup_modal)
                            if (member.value != "true") {
                                document.body.innerHTML += studygroup_modal;
                            }
                        }

                        //Displaying Leave Button if member in studygroup

                        else if (((array[j].participants != undefined) && (is_User == true)) && (member.value == "true" || member.value == "")) {

                            array[j].removeBtn = '<button type="button" class="remove" id="remove' + j + '"> LEAVE </button>'
                            let removeBtn = array[j].removeBtn
                            studygroup_modal += removeBtn
                            studygroup_modal += '</div>'
                            document.body.innerHTML += studygroup_modal;

                        }
                        else {
                            studygroup_modal += '</div>'
                            document.body.innerHTML += studygroup_modal;
                        }

                        console.log("test-line 394")
                    }
                    console.log("test-line 396")
                 
                }

                console.table(array)

                console.log(data1)

                /*
                    function removeDuplicates() {

                        let jsonObject = p_info.map(JSON.stringify);
                        let uniqueSet = new Set(jsonObject);
                        let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
                        console.log(uniqueArray);
                        p_info = uniqueArray
    
                    }
                    removeDuplicates();
                */
                    console.log(p_info)
    
                    //Message Modal
                    let modal = document.getElementById("message_modal");
    
                    // When the user clicks the button, open the modal 
                    for (let i = 0; i < p_info.length; i++) {
    
                        let p = p_info[i]
    
                        console.log(p)
    
                        if (p.hasOwnProperty('messageBtn')) {
                            let n = `notificationBtn${i}`
                           // let b = n.substring(15, 39)
                            console.log(n)
                            let pd = p._id
                            console.log(pd)
    
    
                            console.log(p)
                            console.log(n)
                            console.log(p_info)
                            console.log(modal)
    
                            document.getElementById(n).addEventListener('click', async () => {
                                modal.style.display = "block";
                                
                                console.log(modal)
                                window.onclick = function (event) {
                                    if (event.target == modal) {
                                        modal.style.display = "none";
                                    }
                                }
    
    
    
    
                                console.log("test3")
    
                                let subject
                                let body
    
                                document.getElementById(`sendNotificationBtn`).addEventListener('click', async function (event) {
    
                                    //getting values from form
                                    subject = document.querySelector('#subject').value;
                                    let user1 = JSON.parse(user)
                                    let sender = user1._id;
                                    console.log(sender)
                                    body = document.querySelector('#message_body').value;
    
                                    let receiver
    
                                   // if (b == pd) {
                                    receiver = p._id;
    
    
                                   // }
                                    let notificationData = {
                                        sender: sender,
                                        receiver: receiver,
                                        subject: subject,
                                        body: body,
                                    };
    
                                    console.log(notificationData)
                                    createNotification(notificationData);
    
    
                                });

                            })
    
                        }
    
    
                        let span = document.getElementsByClassName("close")[0];
                        console.log("test2")
    
                        span.addEventListener('click', async () => {
                            modal.style.display = "none";
                        })
    
    
                    }
    
                    //fetching the data
                    async function createNotification(notificationData) {
                        const mssg = document.querySelector("p");
                        const url = "https://studdy-buddy-api-server.azurewebsites.net/notification";
                        console.log("test")
                        try {
                            console.log("test3")
                            const response = await fetch(url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                },
                                body: JSON.stringify(notificationData)
                            });

                            if (response.ok) {
                                mssg.innerHTML = 'Notification was successfully sent!';
                                mssg.style.color = 'white';
                                location.reload();


                            } else {
                                const errorData = await response.json();
                                mssg.innerHTML = "Error: " + errorData.message;
                                mssg.style.color = 'red';
                            }
                        } catch (error) {
                            mssg.innerHTML = "Error: An error occurred";
                            mssg.style.color = 'red';
                        }
                    }
            
                //Join Studygroup

                for (let i = 0; i < array.length; i++) {
                    if (array[i].hasOwnProperty('addBtn')) {

                        let m = `add${i}`
                        console.log(m)

                        console.log(array[i]._id)

                        document.getElementById(m).addEventListener('click', async function (event) {

                            add = "add";
                            url = `https://studdy-buddy-api-server.azurewebsites.net/studygroup/${array[i]._id}/participants?add=${add}`

                            console.log("add")
                            try {
                                let response = await fetch(url, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        "Authorization": `Bearer ${token}`
                                    },
                                    body: JSON.stringify(user._id),
                                })

                                if (response.status === 200) {
                                    let modal1 = document.getElementById("insta_post_modal");
                                    modal1.style.display = "block";

                                    console.log(modal1)
                                    window.onclick = function (event) {
                                        if (event.target == modal1) {
                                            modal1.style.display = "none";
                                        }
                                    }

                                    let u = JSON.parse(user)

                                    document.getElementById("yes_btn").addEventListener('click', async () => {
                                        console.log("yes")
                                        if ((u.ig_username != "" || u.ig_password != "") && (u.ig_username != undefined || u.ig_password != undefined)) {
                                            const url = "https://studdy-buddy-api-server.azurewebsites.net/user/insta-post"
                                            console.log(url)

                                            let image_url = "https://thankful-plant-0f567c30f.4.azurestaticapps.net/images/study-buddy.jpg"
                                            console.log(image_url)
                                            let caption = `${u.username} joined ${array[i].name} studygroup!`
                                            console.log(caption)

                                            const data = {
                                                image_url: image_url,
                                                caption: caption
                                            }
                                            console.log(data)

                                            const body = JSON.stringify(data)
                                            console.log(body)

                                            const options = {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": 'application/json',
                                                    "Authorization": `Bearer ${token}`
                                                },
                                                body
                                            }

                                            console.log('calling fetch')

                                            let response = await fetch(url, options)

                                            console.log(response)
                                            console.log(response.status)

                                            console.log('fetch returned')

                                            if (response.status === 200) {
                                                console.log("Post to instagram successful!")
                                                location.reload()
                                            
                                            }
                                            else {
                                                console.log("failed to post to Instagram!")
                                            }
                                        }
                                        else {
                                            location.href = "insta_info.html"
                                        }

                                    })


                                    document.getElementById("no_btn").addEventListener('click', async () => {
                                        modal1.style.display = "none";
                                        location.reload()

                                    })
                                    let span = document.getElementsByClassName("close")[0];
                                    console.log("test2")
                
                                    span.addEventListener('click', async () => {
                                        modal.style.display = "none";
                                    })
                
                                  //location.reload()
                                } else {
                                    const errorData = await response.json();
                                    mssg.innerHTML = "Error: " + errorData.message;
                                    mssg.style.color = 'red';
                                }
                            } catch (error) {
                                mssg.innerHTML = "Error: An error occurred";
                                mssg.style.color = 'red';
                            }
                        })


                    }

                }


                //Leave Studygroup

                for (let i = 0; i < array.length; i++) {

                    if (array[i].hasOwnProperty('removeBtn')) {

                        let m = `remove${i}`
                        console.log(m)

                        console.log(array[i]._id)

                        document.getElementById(m).addEventListener('click', async function (event) {

                            remove = "remove";
                            url = `https://studdy-buddy-api-server.azurewebsites.net/studygroup/${array[i]._id}/participants?remove=${remove}`

                            console.log("remove")
                            try {
                                let response = await fetch(url, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        "Authorization": `Bearer ${token}`
                                    },
                                    body: JSON.stringify(user._id),
                                })

                                if (response.status === 200) {
                                    location.reload()
                                } else {
                                    const errorData = await response.json();
                                    mssg.innerHTML = "Error: " + errorData.message;
                                    mssg.style.color = 'red';
                                }
                            } catch (error) {
                                mssg.innerHTML = "Error: An error occurred";
                                mssg.style.color = 'red';
                            }

                        })

                    }
                }


                //Delete Studygroups

                for (let i = 0; i < array.length; i++) {

                    if (array[i].hasOwnProperty('deleteBtn')) {

                        let m = `deleteBtn${i}`
                        console.log(m)

                        console.log(array[i]._id)

                        document.getElementById(m).addEventListener('click', async function (event) {

                            url = `https://studdy-buddy-api-server.azurewebsites.net/studygroup/${array[i]._id}`

                            console.log("test")
                            try {
                                let response = await fetch(url, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        "Authorization": `Bearer ${token}`
                                    }
                                })

                                if (response.status === 200) {
                                    location.reload()
                                } else {
                                    const errorData = await response.json();
                                    mssg.innerHTML = "Error: " + errorData.message;
                                    mssg.style.color = 'red';
                                }
                            } catch (error) {
                                mssg.innerHTML = "Error: An error occurred";
                                mssg.style.color = 'red';
                            }



                        })
                    }
                }

                // Edit Studygroups

                let meeting = [];

                for (let i = 0; i < array.length; i++) {

                    if (array[i].hasOwnProperty('addMeetingInfo')) {

                        let m = `addMeetingInfo${i}`
                        console.log(m)

                        console.log(array[i]._id)

                        document.getElementById(m).addEventListener('click', async function (event) {

                            console.log("hello")
                            let d = `day${i}`
                            let t = `time${i}`
                            let l = `location${i}`
                            let day = document.getElementById(d).innerHTML;
                            let time = document.getElementById(t).innerHTML;
                            let location = document.getElementById(l).innerHTML;
                            meeting.push({ day, time, location });
                            console.log(meeting)
                            document.getElementById(d).innerHTML = "";
                            document.getElementById(t).innerHTML = "";
                            document.getElementById(l).innerHTML = "";
                            console.log(meeting)

                        });

                        console.log("hello again")
                    }

                    if (array[i].hasOwnProperty('editBtn')) {
                        let n = `editBtn${i}`
                        console.log(n)

                        console.log(array[i]._id)

                        document.getElementById(n).addEventListener('click', async function (event) {

                            url = `https://studdy-buddy-api-server.azurewebsites.net/studygroup/${array[i]._id}`

                            console.log(url)

                            let n = `name${i}`
                            let ip = `is_public${i}`
                            let mp = `max_participants${i}`
                            let sd = `start_date${i}`
                            let ed = `end_date${i}`
                            let d = `description${i}`
                            let s = `school${i}`
                            let cn = `course_number${i}`


                            let name = document.getElementById(n).innerHTML;
                            let is_public = document.getElementById(ip).innerHTML;
                            let max_participants = document.getElementById(mp).innerHTML;
                            let start_date = document.getElementById(sd).innerHTML;
                            let end_date = document.getElementById(ed).innerHTML;
                            let description = document.getElementById(d).innerHTML;
                            let school = document.getElementById(s).innerHTML;
                            let course_number = document.getElementById(cn).innerHTML;

                            let studygroupData = {
                                name: name,
                                is_public: is_public,
                                start_date: start_date,
                                end_date: end_date,
                                meeting_times: meeting,
                                description: description,
                                school: school,
                                course_number: course_number,
                            };

                            console.log(url)
                            console.log(studygroupData)
                            // studygroupData = JSON.stringify(studygroupData)
                            console.log(studygroupData)

                            try {
                                console.log("Studygroup")

                                const options = {
                                    method: "PATCH",
                                    headers: {
                                        "Authorization": `Bearer ${token}`,
                                        "Content-Type": "application/json"
                                    },
                                    body:JSON.stringify(studygroupData)
                                }

                                const response1 = await fetch(url,options)

                                if (response1.ok) {
                                    mssg.innerHTML = 'Studygroup editted!';
                                    mssg.style.color = 'white'
                                    console.log(studygroupData)
                                    console.log(url)
                                    location.reload()

                                } else {
                                    const errorData = await response.json();
                                    mssg.innerHTML = "Error: " + errorData.message;
                                    mssg.style.color = 'red';
                                 
                                }
                            } catch (error) {
                                mssg.innerHTML = "Error: An error occurred";
                                mssg.style.color = 'red';
                                
                            }



                        })
                    }
                }

            } else {
                const errorData = await response.json();
                mssg.innerHTML = "Error: " + errorData.message;
                mssg.style.color = 'red';
            }
        } catch (error) {
            mssg.innerHTML = "Error: An error occurred";
            mssg.style.color = 'red';
        }

    }

    searchStudygroups()
});

