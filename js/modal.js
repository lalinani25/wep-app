async function fetchUsingDataFromForm() {
    const mssg8 = document.querySelector("#message8")
    const input = document.querySelector("#input8")
    const url = "https://thankful-plant-0f567c30f.4.azurestaticapps.net/createAccount.html"
    const data = {
    code: input.value
    }
    const options = {
    method: "POST",
    headers: { "Content-Type": "createAccount/json" },
    body: JSON.stringify(data)
    }
    let response = await fetch(url, options)
    if (response.status == 200) {
    const obj = await response.json()
    mssg8.innerHTML = obj.message
    }
    else if (response.status == 401) {
    const obj = await response.json()
    mssg8.innerHTML = "Error: " + obj.message
    }
    else if (response.status == 400) {
    mssg8.innerHTML = "Server error"
    }
   }
   document.querySelector("#signUp").addEventListener("click",
   fetchUsingDataFromForm)
   