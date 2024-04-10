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

                        array[i].editBtn = "<button id = 'editBtn" + i + "'>" + "SAVE" + "</button>"
                        array[i].deleteBtn = "<button id = 'deleteBtn" + i + "'>" + "DELETE" + "</button>"

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

                        let name = '<p display="inline-block" id = "name' + j + '" contentEditable="true">' + array[j].name + '</p>'
                        studygroup_modal += name
                        console.log(name)

                        let is_public = '<p id = "is_public' + j + '" contentEditable="true" >' + array[j].is_public + '</p>'
                        studygroup_modal += is_public

                        let max_participants = '<p  id = "max_participants' + j + '" contentEditable="true">' + array[j].max_participants + '</p>'
                        studygroup_modal += max_participants

                        participants = array[j].participants
                        let participant = '<div id="participants">PARTICIPANTS:'


                        if (!(participants.length === 0)) {
                            for (let k = 0; k < participants.length; k++) {
                                console.log(participants[k])
                                participant += '<p id = "p_name' + j + '" >' + data1[k].username + '</p>'

                            }
                        } else {
                            participant += '<p id = "p_name">No Participants</p>'
                        }

                        participant += '</div>'
                        studygroup_modal += participant

                        let st_date = array[j].start_date
                        let final_date = st_date.split("T", 1)[0]
                        console.log(final_date)
                        let start_date = '<p id = "start_date' + j + '" contentEditable="true" >' + final_date + '</p>'
                        studygroup_modal += start_date

                        let en_date = array[j].end_date
                        let fin_date = en_date.split("T", 1)[0]
                        console.log(final_date)
                        let end_date = '<p id = "end_date' + j + '" contentEditable="true" >' + fin_date + '</p>'
                        studygroup_modal += end_date

                        let school = '<p id = "school' + j + '" contentEditable="true" >' + array[j].school + '</p>'
                        studygroup_modal += school

                        let description = '<p id = "description' + j + '" contentEditable="true" >' + array[j].description + '</p>'
                        studygroup_modal += description

                        let course_number = '<p id = "course_number' + j + '" contentEditable="true" >' + array[j].course_number + '</p>'
                        studygroup_modal += course_number

                        let arr = array[j].meeting_times
                        console.log(arr)
                        let meeting_times = '<div id="meeting_times">MEETING TIMES'
                        for (let k = 0; k < arr.length; k++) {
                            meeting_times += '<p id = "day' + j + '" contentEditable="true" >' + arr[k].day + '</p>' + '<p id = "time' + j + '" contentEditable="true">' + arr[k].time + '</p>' +
                                '<p id = "location' + j + '" contentEditable="true"> ' + arr[k].location + '</p>'

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
                        let name = '<p display="inline-block" id = "name">' + array[j].name + '</p>'
                        studygroup_modal += name
                        console.log(name)

                        let is_public = '<p id = "is_public" >' + array[j].is_public + '</p>'
                        studygroup_modal += is_public

                        let max_participants = '<p  id = "max_participants">' + array[j].max_participants + '</p>'
                        studygroup_modal += max_participants

                        participants = array[j].participants

                        console.log(participants)
                        let participant = '<div id="participants">PARTICIPANTS:'

                        let is_User;

                        for (let k = 0; k < participants.length; k++) {
                            if(realUserId == JSON.stringify(array[j].participants[k])){
                                is_User = true
                            }
                        }

                        if (!(participants.length === 0) && (is_User == true)) {

                            for (let k = 0; k < participants.length; k++) {

                                console.log(participants[k])
                                participant += '<p id = "p_name' + j + '" >' + data1[k].username + '</p>'

                            }

                        }
                        else {
                            participant += '<p id = "p_name">' + participants.length +'/' + array[j].max_participants +'</p>'
                        }
                        participant += '</div>'
                        studygroup_modal += participant

                        let st_date = array[j].start_date
                        let final_date = st_date.split("T", 1)[0]
                        console.log(final_date)
                        let start_date = '<p id = "start_date">' + final_date + '</p>'
                        studygroup_modal += start_date

                        let en_date = array[j].end_date
                        let fin_date = en_date.split("T", 1)[0]
                        console.log(final_date)
                        let end_date = '<p id = "end_date">' + fin_date + '</p>'
                        studygroup_modal += end_date

                        let school = '<p id = "school" >' + array[j].school + '</p>'
                        studygroup_modal += school

                        let description = '<p id = "description" >' + array[j].description + '</p>'
                        studygroup_modal += description

                        let course_number = '<p id = "course_number" >' + array[j].course_number + '</p>'
                        studygroup_modal += course_number

                        let arr = array[j].meeting_times
                        console.log(arr)
                        let meeting_times = '<div id="meeting_times">MEETING TIMES'
                        for (let k = 0; k < arr.length; k++) {
                            meeting_times += '<p id = "day" >' + arr[k].day + '</p>' + '<p id = "time">' + arr[k].time + '</p>' +
                                '<p id = "location"> ' + arr[k].location + '</p>'

                        }
                        meeting_times += '</div>'
                        studygroup_modal += meeting_times

                        let addBtn = []
                        console.log(JSON.stringify(array[j].participants))

                    
                        for (let k = 0; k < participants.length; k++) {
                            if(realUserId == JSON.stringify(array[j].participants[k])){
                                is_User = true
                            }
                        }
                            if (((array[j].participants == undefined) || (is_User != true)) || member.value == "false") {

                                array[j].addBtn = '<button type="button" class="add' + j + '" id="add' + j + '"> JOIN </button>'
                                let addBtn = array[j].addBtn
                                studygroup_modal += addBtn
                                studygroup_modal += '</div>'
                                console.log(studygroup_modal)
                                if (member.value != "true") {
                                    document.body.innerHTML += studygroup_modal;
                                }
                            }

                            //Displaying Leave Button if member in studygroup

                            else if (((array[j].participants != undefined) || (is_User == true)) && (member.value == "true" || member.value == "")) {

                                array[j].removeBtn = '<button type="button" class="remove' + j + '" id="remove' + j + '"> LEAVE </button>'
                                let removeBtn = array[j].removeBtn
                                studygroup_modal += removeBtn
                                studygroup_modal += '</div>'
                                document.body.innerHTML += studygroup_modal;

                            }
                        
                        console.log("test-line 394")
                    }
                    console.log("test-line 396")
                }

                console.table(array)

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
                                max_participants: max_participants,
                                start_date: start_date,
                                end_date: end_date,
                                meeting_times: meeting,
                                description: description,
                                school: school,
                                course_number: course_number,
                            };

                            console.log(studygroupData)
                            console.log("test")

                            try {
                                let response = await fetch(url, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        "Authorization": `Bearer ${token}`
                                    },
                                    body: JSON.stringify(studygroupData),
                                })

                                if (response.ok) {
                                    mssg.innerHTML = 'Studygroup editted!';
                                    mssg.style.color = 'white'
                                    console.log(studygroupData)
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

