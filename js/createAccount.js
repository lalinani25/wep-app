
const signUp = document.querySelector('#signUp');
const message = document.querySelector("p");


signUp.addEventListener('click', async function (event) {

    const name = document.querySelector('#name').value;
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const school = document.querySelector('#school').value;

    const majors = [];

    console.log(majors)


    document.querySelector("#addMajor").addEventListener('click', async function (event) {
        console.log("hello")
        const major = document.querySelector('#majors').value;
        majors.push(major);
        console.log(majors)
        document.querySelector('#major').value = "";
    });

    majors.splice(0, 1)
    const userData = {
        name: name,
        username: username,
        email: email,
        password: password,
        school: school,
        majors: majors,
    };

    createAccount(userData);

});

async function createAccount(userData) {
    const mssg = document.querySelector("p");
    const url = "https://studdy-buddy-api-server.azurewebsites.net/user";
    console.log("test")
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            try {
                const data = await response.json();
                mssg.innerHTML = data.message;
                message.textContent = 'Verification email has been sent to ' + userData.email;
                message.style.color = 'green';
            } catch (error) {
                console.error('Error parsing JSON response:', error.message);
                mssg.innerHTML = 'Verification email has been sent to ' + userData.email;
                mssg.style.color = 'green';
            }
        } else {
            const errorData = await response.json();
            mssg.innerHTML = "Error: " + errorData.message;
            mssg.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error.message);
        mssg.innerHTML = "Error: " + error.message;
        mssg.style.color = 'red';
    }
}
