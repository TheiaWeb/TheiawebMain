document.addEventListener("DOMContentLoaded", function() {
    var formContainer = document.getElementById("formContainer");
  
    function displayForm(formHtml) {
      formContainer.innerHTML = formHtml;
    }
  
    function loadFormFile(formFile) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            displayForm(xhr.responseText);
          } else {
            console.error("Error loading form file:", xhr.status);
          }
        }
      };
      xhr.open("GET", formFile, true);
      xhr.send();
    }
  
    function handleRadioChange() {
      var purchaseTypeRadios = document.getElementsByName("purchaseType");
      for (var i = 0; i < purchaseTypeRadios.length; i++) {
        if (purchaseTypeRadios[i].checked) {
          if (purchaseTypeRadios[i].value === "oneTime") {
            loadFormFile("form-one-time.html");
          } else if (purchaseTypeRadios[i].value === "threeTimes") {
            loadFormFile("form-three-times.html");
          }
          break;
        }
      }
    }
  
    var purchaseTypeRadios = document.getElementsByName("purchaseType");
    for (var i = 0; i < purchaseTypeRadios.length; i++) {
      purchaseTypeRadios[i].addEventListener("change", handleRadioChange);
    }
  });
  