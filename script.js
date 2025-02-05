document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.getElementById('navbar-bouton');
  const mainMenu = document.getElementById('navbar-menu');

  menuButton.addEventListener('click', function () {
    if (mainMenu.style.display === 'flex') {
      mainMenu.style.display = 'none';
    } else {
      mainMenu.style.display = 'flex';
    }
  });

});


fetch("data.json")
.then( res => { 
  return res.json(); })
  .then( data => {
    show(data);})
    
    
function show(data){
  var mentoringTable = document.getElementById("mentoring-table");
  var thead = document.createElement("thead");
      thead.className = "bold-table"
  var tr = document.createElement("tr");
    Object.keys(data.mentoring[0]).forEach(key => {
      var th = document.createElement("th");
      th.innerHTML = key;
      tr.appendChild(th);
    });
    thead.appendChild(tr)
  data.mentoring.forEach(elements => {
    var tr = document.createElement("tr");
    tr.innerHTML = "";
    Object.values(elements).forEach(value => {
      var td = document.createElement("td");
      td.innerHTML = value;
      tr.appendChild(td); 
    });
    mentoringTable.appendChild(thead);
    mentoringTable.appendChild(tr);
  });
}

