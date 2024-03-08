const search_btn = document.querySelector('#search_btn');
const message = document.querySelector("p");
const token = localStorage.getItem("token");
const mssg = document.querySelector("p");

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
    
        const studyGroupSearchData = {
            ongoing: ongoing.value,
            sortBy: sortBy.value,
            search: search.value,
            skip: skip.value
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
    if(skip.value == ""){
        if(ongoing.value == "true" || ongoing.value == "false"){
            console.log("ongoing" + ongoing.value)
           if(sortBy.value === "asc" || sortBy.value === "desc"){
                url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&sortBy=name:${sortBy.value}&limit=${5}`
                console.log(url)
                if(search.value != ""){
                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&sortBy=name:${sortBy.value}&search=${search.value}&limit=${3}`
                    console.log(url)  
                }
           }
           else if(search.value != ""){
                url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&search=${search.value}&limit=${3}`
                console.log(url)  
            }
            else url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&limit=${3}`
            console.log(url)
        }
    
        else if(sortBy.value == "asc" || sortBy.value == "desc"){
            if(search.value == ""){
                url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?sortBy=name:${sortBy.value}&limit=${3}`
                console.log(url)
            }
            else url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?sortBy=name:${sortBy.value}&search=${search.value}&limit=${3}`
                console.log(url)
        }
    
        else if(ongoing.value == "" && sortBy.value == "" && search.value != ""){
            url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?search=${search.value}&limit=${3}`
                console.log(url)
        }
    }
    
    
    
    else if (skip.value != ""){
        if(ongoing.value == "true" || ongoing.value == "false"){
            console.log("ongoing" + ongoing.value)
           if(sortBy.value === "asc" || sortBy.value === "desc"){
                url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&sortBy=name:${sortBy.value}&limit=${5}&skip=${skip.value}`
                console.log(url)
                if(search.value != ""){
                    url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&sortBy=name:${sortBy.value}&search=${search.value}&limit=${3}&skip=${skip.value}`
                    console.log(url)  
                }
           }
           else if(search.value != ""){
                url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&search=${search.value}&limit=${3}&skip=${skip.value}`
                console.log(url)  
            }
            else url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?ongoing=${ongoing.value}&limit=${3}&skip=${skip.value}`
            console.log(url)
        }
    
        else if(sortBy.value == "asc" || sortBy.value == "desc"){
            if(search.value == ""){
                url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?sortBy=name:${sortBy.value}&limit=${3}&skip=${skip.value}`
                console.log(url)
            }
            else url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?sortBy=name:${sortBy.value}&search=${search.value}&limit=${3}&skip=${skip.value}`
                console.log(url)
        }
    
        else if(ongoing.value == "" && sortBy.value == "" && search.value != ""){
            url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?search=${search.value}&limit=${3}&skip=${skip.value}`
                console.log(url)
            
        }
        else{
            url = `https://studdy-buddy-api-server.azurewebsites.net/studygroups?limit=${3}&skip=${skip.value}`
                console.log(url)
        }
    }
    
        console.log(url)
        try {
            console.log("test3")
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },

            });

            const js_obj = await response.text()
            console.log(js_obj)
            const jsonObject = eval(js_obj);

            function createTableWithInnerHTML() {

                let tableHTML = '<table border="2"><tr>';
     
                Object.keys(jsonObject[0]).forEach(key => {
                    tableHTML += `<th>${key}</th>`;
                });
     
                tableHTML += '</tr>';
     
                jsonObject.forEach(item => {
                    tableHTML += '<tr>';
                    Object.values(item).forEach(value => {
                        tableHTML += `<td>${value}</td>`;
                    });
                    tableHTML += '</tr>';
                });
     
                tableHTML += '</table>';
                
                document.querySelector("#sg").innerHTML = "STUDYGROUP RESULTS";
                document.body.innerHTML += tableHTML;
            }
     

            if (response.ok) {
                mssg.innerHTML = 'Here are the study groups you are looking for.';
                mssg.style.color = 'white';
                console.log(jsonObject)
                console.table(jsonObject)
                console.log("test test")
               // location.href = "studygroups.html"
                createTableWithInnerHTML();

                
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

