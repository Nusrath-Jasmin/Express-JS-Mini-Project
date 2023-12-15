function checkvalidation() {

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}<>])[A-Za-z\d!@#$%^&*(),.?":{}<>]{8,}$/;
  let inppass = document.getElementById("pass").value;
  let show = document.getElementById("show");
  let values = inppass;
  console.log("hll"+values);
  const correctpass = passwordPattern.test(values);
  if (!correctpass) {
    show.style.display = "block";
    return false;
  } else {
    show.style.display = "none";
    return true;
  }
  
}
