const search_btn = document.querySelector('#search_btn');
const user = localStorage.getItem("user");
const message = document.querySelector("p");
const token = localStorage.getItem("token");
const mssg = document.querySelector("p");
let studygroup_modal;

let array = []
let my_array = []

search_btn.addEventListener('click', async function (event) {

    //fetching the data
    async function searchStudygroups() {


        console.log("search")
        let url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?`
        console.log(url)

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

                    }

                }

                console.log(array)



                for (let j = 0; j < array.length; j++) {

                    console.log(array[j])

                    console.log("array.owner: " + array[j].owner)
                    console.log("user: " + user)
                    let user_id = JSON.parse(user)
                    console.log("user_id: " + user_id)
                    let realUserId = JSON.stringify(user_id._id);
                    console.log("realUserId: " + realUserId)
                    if (JSON.stringify(array[j].owner) === realUserId && (owner.value == "" || owner.value == "true")) {

                        studygroup_modal = '<div id="studygroup_modal">'

                        let name = '<p display="inline-block" id = "name' + j + '" contentEditable="true">' + array[j].name + '</p>'
                        studygroup_modal += name
                        console.log(name)

                        let is_public = '<p id = "is_public' + j + '" contentEditable="true" >' + array[j].is_public + '</p>'
                        studygroup_modal += is_public

                        let max_participants = '<p  id = "max_participants' + j + '" contentEditable="true">' + array[j].max_participants + '</p>'
                        studygroup_modal += max_participants

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
                        
                        meeting_times +=  '<button type="button" class="addMeetingInfo' + j + '" id="addMeetingInfo'+ j + '"> + </button>'

                        meeting_times += '</div>'
                        studygroup_modal += meeting_times


                        let editBtn = array[j].editBtn
                        studygroup_modal += editBtn

                        studygroup_modal += '</div>'
                        console.log(studygroup_modal)
                        document.body.innerHTML += studygroup_modal;

                    }

                    else if (JSON.stringify(array[j].owner) != realUserId && (owner.value == "" || owner.value == "false")) {

                        studygroup_modal = '<div id="studygroup_modal">'
                        let name = '<p display="inline-block" id = "name">' + array[j].name + '</p>'
                        studygroup_modal += name
                        console.log(name)

                        let is_public = '<p id = "is_public" >' + array[j].is_public + '</p>'
                        studygroup_modal += is_public

                        let max_participants = '<p  id = "max_participants">' + array[j].max_participants + '</p>'
                        studygroup_modal += max_participants

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

                        studygroup_modal += '</div>'
                        console.log(studygroup_modal)
                        document.body.innerHTML += studygroup_modal;

                    }
                }

                console.log("hello")
                let meeting0 = [{}];

                document.querySelector("#addMeetingInfo0").addEventListener('click', async function (event) {
                    console.log("hello")
                    let day = document.querySelector('#day0').innerHTML;
                    let time = document.querySelector('#time0').innerHTML;
                    let location = document.querySelector('#location0').innerHTML;
                    meeting0.push({ day, time, location });
                    console.log(meeting0)
                    document.querySelector('#day0').innerHTML= "";
                    document.querySelector('#time0').innerHTML = "";
                    document.querySelector('#location0').innerHTML= "";
                    console.log(meeting0)
                
                });
                //removing the empty object from the first index in meeting[]
                meeting0.splice(0, 1)

                console.log("hello again")
                document.querySelector("#editBtn0").addEventListener('click', async function (event) {

                    console.table(my_array)
                    let meeting = meeting0;

                    let id = my_array._id
                    console.log(id)

                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroup/65d8b646ad05c8f742d4ff0e`

                    console.log(url)
                    let name = document.querySelector('#name0').innerHTML;
                    let is_public = document.querySelector('#is_public0').innerHTML;
                    let max_participants = document.querySelector('#max_participants0 ').innerHTML;
                    let start_date = document.querySelector('#start_date0').innerHTML;
                    let end_date = document.querySelector('#end_date0').innerHTML;
                    let description = document.querySelector('#description0').innerHTML;
                    let school = document.querySelector('#school0').innerHTML;
                    let course_number = document.querySelector('#course_number0').innerHTML;
                  
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

                console.log("hello")
                let meeting3 = [{}];

                document.querySelector("#addMeetingInfo3").addEventListener('click', async function (event) {
                    console.log("hello")
                    let day = document.querySelector('#day3').innerHTML;
                    let time = document.querySelector('#time3').innerHTML;
                    let location = document.querySelector('#location3').innerHTML;
                    meeting3.push({ day, time, location });
                    console.log(meeting3)
                    document.querySelector('#day3').innerHTML= "";
                    document.querySelector('#time3').innerHTML = "";
                    document.querySelector('#location3').innerHTML= "";
                    console.log(meeting3)
                
                });
                //removing the empty object from the first index in meeting[]
                meeting3.splice(0, 1)
                
                document.querySelector("#editBtn3").addEventListener('click', async function (event) {

                    console.table(my_array)
                    let meeting = meeting3;

                    let id = my_array._id
                    console.log(id)

                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroup/65f3fe1321a388de3fecc9d1`

                    console.log(url)
                    let name = document.querySelector('#name3').innerHTML;
                    let is_public = document.querySelector('#is_public3').innerHTML;
                    let max_participants = document.querySelector('#max_participants3 ').innerHTML;
                    let start_date = document.querySelector('#start_date3').innerHTML;
                    let end_date = document.querySelector('#end_date3').innerHTML;
                    let description = document.querySelector('#description3').innerHTML;
                    let school = document.querySelector('#school3').innerHTML;
                    let course_number = document.querySelector('#course_number3').innerHTML;

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

                
                console.log("hello")
                let meeting4 = [{}];

                document.querySelector("#addMeetingInfo4").addEventListener('click', async function (event) {
                    console.log("hello")
                    let day = document.querySelector('#day4').innerHTML;
                    let time = document.querySelector('#time4').innerHTML;
                    let location = document.querySelector('#location4').innerHTML;
                    meeting4.push({ day, time, location });
                    console.log(meeting4)
                    document.querySelector('#day4').innerHTML= "";
                    document.querySelector('#time4').innerHTML = "";
                    document.querySelector('#location4').innerHTML= "";
                    console.log(meeting4)
                
                });
                //removing the empty object from the first index in meeting[]
                meeting4.splice(0, 1)

                document.querySelector("#editBtn4").addEventListener('click', async function (event) {

                    console.table(my_array)
                    let meeting = meeting4;

                    let id = my_array._id
                    console.log(id)

                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroup/65f7bace21a388de3feccc11`

                    console.log(url)
                    let name = document.querySelector('#name4').innerHTML;
                    let is_public = document.querySelector('#is_public4').innerHTML;
                    let max_participants = document.querySelector('#max_participants4 ').innerHTML;
                    let start_date = document.querySelector('#start_date4').innerHTML;
                    let end_date = document.querySelector('#end_date4').innerHTML;
                    let description = document.querySelector('#description4').innerHTML;
                    let school = document.querySelector('#school4').innerHTML;
                    let course_number = document.querySelector('#course_number4').innerHTML;
                  
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
