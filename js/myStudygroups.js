const user = localStorage.getItem("user");
const studygroup = localStorage.getItem("studygroups");
const token = localStorage.getItem("token");
const mssg = document.querySelector("p");
let array = []
let my_array = []

let studygroup_modal;
let participants = [];
let data1 = []
let notificationBtn = []
let p_info = []

document.querySelector("#my_studygroups").addEventListener('click', async function (event) {
    //fetching the data
    async function searchStudygroups() {


        console.log("search")
        let url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups`
        console.log(url)


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
                            p.messageBtn = '<button class = "notificationBtn" id = "notificationBtn' + p._id + '" style="font-size:24px display:inline">&#9993;</button>'
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
                        console.log("test")

                        try {
                            console.log("Studygroup")

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


        }
        else {
            h1.innerHTML = "Something went wrong."
            p.innerHTML = "Please try again!"

            console.log("Error ")
        }

    }


    searchStudygroups()


})
