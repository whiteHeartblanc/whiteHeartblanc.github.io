function checkCreds(x) {
    if (x.username.value == "admin" && x.password.value == "p@ssword") {
        window.location.href = "main.html";
    }
    else {
        alert("Wrong Creds");
    }
}