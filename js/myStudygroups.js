const user = localStorage.getItem("user");
const studygroup = localStorage.getItem("studygroups");
const token = localStorage.getItem("token");
const mssg = document.querySelector("p");
let array = []
let my_array = []

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
            let newArray = array;
            let my_array = []
            let counter = 0;
            for (let i = 0; i < array.length; i++) {
                console.log("array.owner: " + array[i].owner)
                console.log("user: " + user)
                let user_id = JSON.parse(user)
                console.log("user_id: " + user_id)
                let realUserId = JSON.stringify(user_id._id);
                console.log("realUserId: " + realUserId)


                let studygroup_modal;
        
                if (JSON.stringify(array[i].owner) === realUserId) {
                   
                    counter++;
                    for (let j = 0; j < counter; j++) {
                        my_array[j] = array[i]
                        console.log(my_array[j])
                        studygroup_modal = '<div id="studygroup_modal">'

                        let name = '<p display="inline-block" id = "name' + j + '" contentEditable="true">' + my_array[j].name + '</p>' 
                        studygroup_modal += name
                        console.log(name)

                        let is_public = '<p id = "is_public' + j + '" contentEditable="true" >' + my_array[j].is_public + '</p>'
                        studygroup_modal += is_public

                        let max_participants = '<p  id = "max_participants' + j + '" contentEditable="true">' + my_array[j].max_participants + '</p>'
                        studygroup_modal += max_participants

                        let st_date = my_array[j].start_date
                        let final_date = st_date.split("T", 1)[0]
                        console.log(final_date)
                        let start_date = '<p id = "start_date' + j + '" contentEditable="true" >' + final_date + '</p>'
                        studygroup_modal += start_date

                        let en_date = my_array[j].end_date
                        let fin_date = en_date.split("T", 1)[0]
                        console.log(final_date)
                        let end_date = '<p id = "end_date' + j + '" contentEditable="true" >' + fin_date + '</p>'
                        studygroup_modal += end_date

                        let school = '<p id = "school' + j + '" contentEditable="true" >' + my_array[j].school + '</p>'
                        studygroup_modal += school

                        let description = '<p id = "description' + j + '" contentEditable="true" >' + my_array[j].description + '</p>'
                        studygroup_modal += description

                        let course_number = '<p id = "course_number' + j + '" contentEditable="true" >' + my_array[j].course_number + '</p>' 
                        studygroup_modal += course_number

                        let arr = my_array[j].meeting_times
                        console.log(arr)
                        let meeting_times = '<div id="meeting_times">MEETING TIMES'
                        for (let k = 0; k < arr.length; k++) {
                            meeting_times += '<p id = "day' + j + '" contentEditable="true" >' + arr[k].day + '</p>' + '<p id = "time' + j + '" contentEditable="true">' + arr[k].time + '</p>' +
                                '<p id = "location' + j + '"contentEditable="true"> ' + arr[k].location + '</p>' 
                            
                        }
                        meeting_times+= '</div>'
                        studygroup_modal += meeting_times

                        studygroup_modal += "<button id = 'editBtn" + j+"'>" + "Edit" + "</button>"
                        studygroup_modal += '</div>'
        
                    }
                    document.body.innerHTML += studygroup_modal;
                    document.querySelector("#sg").innerHTML = "MY STUDYGROUPS";
                }

            }

               
            
                document.querySelector("#editBtn0").addEventListener('click', async function (event) {

                    console.table(my_array)
                    let meeting = [{}];

                    let id = my_array._id
                    console.log(id)
                       
                     url = `https://studdy-buddy-api-server.azurewebsites.net/studygroup/65d8b646ad05c8f742d4ff0e`
                    
                    console.log(url)
                   let name = document.querySelector('#name0').innerHTML;
                   let is_public = document.querySelector('#is_public0').innerHTML;
                   let  max_participants = document.querySelector('#max_participants0 ').innerHTML;
                   let  start_date = document.querySelector('#start_date0').innerHTML;
                   let  end_date = document.querySelector('#end_date0').innerHTML;
                   let  description = document.querySelector('#description0').innerHTML;
                   let  school = document.querySelector('#school0').innerHTML;
                   let  course_number = document.querySelector('#course_number0').innerHTML;
                   let  day = document.querySelector('#day0').innerHTML;
                  let  time = document.querySelector('#time0').innerHTML;
                  let  location = document.querySelector('#location0').innerHTML;
                  meeting.push({ day, time, location });
                   
                    meeting.splice(0, 1)
                
                
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
               
                document.querySelector("#editBtn1").addEventListener('click', async function (event) {

                    console.table(my_array)
                    let meeting = [{}];
                    
                    let id = my_array._id
                    console.log(id)
                   
                 
                
                    
                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroup/${my_array[1]._id}`
                    
                    console.log(url)
                   let  name = document.querySelector('#name1').innerHTML;
                    let is_public = document.querySelector('#is_public1').innerHTML;
                    console.log(is_public)
                   let  max_participants = document.querySelector('#max_participants1 ').innerHTML;
                    let start_date = document.querySelector('#start_date1').innerHTML;
                   let  end_date = document.querySelector('#end_date1').innerHTML;
                   let  description = document.querySelector('#description1').innerHTML;
                   let  school = document.querySelector('#school1').innerHTML;
                   let  course_number = document.querySelector('#course_number1').innerHTML;
                   let  day = document.querySelector('#day1').innerHTML;
                    let time = document.querySelector('#time1').innerHTML;
                   let  location = document.querySelector('#location1').innerHTML;
                 meeting.push({ day, time, location });
                   
                    meeting.splice(0, 1)
                
                
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
        else {
            h1.innerHTML = "Something went wrong."
            p.innerHTML = "Please try again!"

            console.log("Error ")
        }
    
    }

    

    searchStudygroups()
   

})
