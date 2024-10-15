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