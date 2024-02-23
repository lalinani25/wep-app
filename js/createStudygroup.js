const create = document.querySelector('#create');
const message = document.querySelector("p");
const token = localStorage.getItem("token");

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

    createStudygroup(studygroupData);

});


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
            mssg.innerHTML = 'Study group was successfully created!';
            mssg.style.color = 'green';

            location.href = "main.html"

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
