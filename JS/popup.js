var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
export function openModal(message) {
    var modelDiv = document.getElementById("model-inner");
    var oldchild = document.getElementById("old-child");
   
    const data = document.createElement("div");
    data.id = "old-child";
    data.textContent = message;
    modelDiv.replaceChild(data, oldchild);
    modal.style.display = "block";
  }

  span.onclick = function () {
    modal.style.display = "none";
  };
   
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };