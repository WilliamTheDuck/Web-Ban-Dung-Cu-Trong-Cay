var correctName = /^[a-zA-ZÀ-ỹà-ỹ\s]+$/;
var correctEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var correctPhone = /^[0-9]+$/;
var correctTitle = /^[a-zA-Z0-9À-ỹà-ỹ._\s-]+$/;
var correctContent = /^[a-zA-Z0-9À-ỹà-ỹ._\s-]+$/;

var useremail = document.querySelector("#email");
var username  = document.querySelector("#name");
var userphone = document.querySelector("#phone");
var usertitle = document.querySelector("#title");
var usercontent = document.querySelector("#content");

var submitcontact = document.querySelector("#submit-contact");

function validateField(inputElement, correctValue, maxLength, isRequired) {
    var value = inputElement.value;

    if (value === "") {
        if (isRequired) {
            inputElement.classList.remove('is-valid');
            inputElement.classList.add('is-invalid');
            return false;
        }
        inputElement.classList.remove('is-valid', 'is-invalid');
        return true;
    }

    var isValid = correctValue.test(value) && value.length <= maxLength;

    if (isValid) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
        return true;
    } else {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid');
        return false;
    }
}

var inputs = [username, useremail, userphone, usertitle, usercontent];
inputs.forEach(function(input) {
    input.addEventListener("focus", function() {
        input.classList.remove('is-invalid');
    });
});

username.addEventListener("blur", function(){
    if(username.value !== "") validateField(username, correctName, 50, true);
});

useremail.addEventListener("blur", function(){
    if(useremail.value !== "") validateField(useremail, correctEmail, Infinity, true);
});

userphone.addEventListener("blur", function(){
    if(userphone.value !== "") validateField(userphone, correctPhone, 10, false);
});

usertitle.addEventListener("blur", function(){
    if(usertitle.value !== "") validateField(usertitle, correctTitle, 100, true);
});

usercontent.addEventListener("blur", function(){
    if(usercontent.value !== "") validateField(usercontent, correctContent, 400, true);
});


submitcontact.addEventListener("submit", function(event){
    event.preventDefault();

    var isNameValid = validateField(username, correctName, 50, true);
    var isEmailValid = validateField(useremail, correctEmail, Infinity, true);
    var isPhoneValid = validateField(userphone, correctPhone, 10, false);
    var isTitleValid = validateField(usertitle, correctTitle, 100, true);
    var isContentValid = validateField(usercontent, correctContent, 400, true);

    if (isNameValid && isEmailValid && isPhoneValid && isTitleValid && isContentValid) {
        alert("Cảm ơn vì bạn đã góp ý với chúng tôi");
        submitcontact.reset();
        inputs.forEach(function(input) {
            input.classList.remove('is-valid', 'is-invalid');
        });
    } else {
        alert("Bạn vui lòng kiểm tra lại thông tin các trường báo đỏ!");
    }
});