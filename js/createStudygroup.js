const create = document.querySelector('#create');
const message = document.getElementById("p2");
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

//creating the meeting array
const meeting = [{}];

console.log(meeting)

//adding meeting info to the array when the + button is clicked
document.querySelector("#addMeetingInfo").addEventListener('click', async function (event) {
    console.log("hello")
    const day = document.querySelector('#day').value;
    const time = document.querySelector('#time').value;
    const location = document.querySelector('#location').value;
    meeting.push({ day, time, location });
    console.log(meeting)
    document.querySelector('#day').value = "";
    document.querySelector('#time').value = "";
    document.querySelector('#location').value = "";

});
//removing the empty object from the first index in meeting[]
meeting.splice(0, 1)


//creating the studygroup when clicking the create button
create.addEventListener('click', async function (event) {
    console.log(meeting);

    //getting values from form
    const name = document.querySelector('#name').value;
    const owner = localStorage.getItem("_id");
    const is_public = document.querySelector('#is_public').value;
    const max_participants = document.querySelector('#max_participants ').value;
    const start_date = document.querySelector('#start_date').value;
    const end_date = document.querySelector('#end_date').value;
    const description = document.querySelector('#description').value;
    const school = document.querySelector('#school').value;
    const course_number = document.querySelector('#course_number').value;

    const studygroupData = {
        name: name,
        owner: owner,
        is_public: is_public,
        max_participants: max_participants,
        start_date: start_date,
        end_date: end_date,
        meeting_times: meeting,
        description: description,
        school: school,
        course_number: course_number,
    };


//fetching the data
async function createStudygroup(studygroupData) {
    const mssg = document.querySelector("p");
    const url = "https://studdy-buddy-api-server.azurewebsites.net/studygroup";
    console.log("test")
    try {
        console.log("test3")
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(studygroupData)
        });

        if (response.ok) {

            //mssg.innerHTML = 'Study group was successfully created!';
            //mssg.style.color = 'white';
            let modal1 = document.getElementById("insta_post_modal");
            modal1.style.display = "block";

            console.log(modal1)

            let u = JSON.parse(user)

            document.getElementById("yes_btn").addEventListener('click', async () => {
                console.log("yes")
                if ((u.ig_username != "" || u.ig_password != "") && (u.ig_username != undefined || u.ig_password != undefined)) {
                    const url = "https://studdy-buddy-api-server.azurewebsites.net/user/insta-post"
                    console.log(url)

                    let image_url = "https://thankful-plant-0f567c30f.4.azurestaticapps.net/images/study-buddy.jpg"
                    console.log(image_url)
                    let caption = `${u.username} created a new studygroup!`
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

createStudygroup(studygroupData);
});