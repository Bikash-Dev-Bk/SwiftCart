function toggleMenu() {
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const crossIcon = document.getElementById("cross-icon");
  const smallMenu = document.getElementById("small-menu");

  if (hamburgerIcon.style.display === "none") {
    hamburgerIcon.style.display = "block";
    crossIcon.style.display = "none";
    smallMenu.style.display = "none";
  } else {
    hamburgerIcon.style.display = "none";
    crossIcon.style.display = "block";
    smallMenu.style.display = "block";
  }
}