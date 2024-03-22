
var modal = document.getElementById("myModal");

var btn = document.querySelector("#editBtn");
console.log("test1")

document.querySelector("#save").addEventListener('click', async() => {

  modal.style.display = "none";

console.log("test4")
})


btn.addEventListener('click', async() => {
    modal.style.display = "block";

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  })


var span = document.getElementsByClassName("close")[0];
console.log("test2")

span.addEventListener('click', async() => {
  modal.style.display = "none";
})

console.log("test3")
