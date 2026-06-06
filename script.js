let cart = [];
let currentCategory = "ALL";

function enterSite(){

  const age =
    document.getElementById("ageCheck").checked;

  const terms =
    document.getElementById("termsCheck").checked;

  if(!age || !terms){

    alert(
      "Devi confermare età e termini per accedere."
    );

    return;
  }

  localStorage.setItem(
    "bpfam_access",
    "yes"
  );

  document.getElementById(
    "ageGate"
  ).style.display = "none";

  document.getElementById(
    "siteContent"
  ).classList.remove("hidden");

}

if(
  localStorage.getItem("bpfam_access")
  === "yes"
){

  window.addEventListener(
    "DOMContentLoaded",
    () => {

      document.getElementById(
        "ageGate"
      ).style.display = "none";

      document.getElementById(
        "siteContent"
      ).classList.remove("hidden");

    }
  );

}