// ==========================
// LẤY ELEMENT
// ==========================

let currentStep = 1

let progressBar = document.getElementById("progressBar")

// step div
let step1 = document.getElementById("step1")
let step2 = document.getElementById("step2")
let step3 = document.getElementById("step3")

// input
let fullname = document.getElementById("fullname")
let birth = document.getElementById("birth")
let gender = document.getElementById("gender")

let email = document.getElementById("email")
let password = document.getElementById("password")
let confirmPass = document.getElementById("confirm")

// error span
let nameError = document.getElementById("nameError")
let birthError = document.getElementById("birthError")
let genderError = document.getElementById("genderError")

let emailError = document.getElementById("emailError")
let passError = document.getElementById("passError")
let confirmError = document.getElementById("confirmError")

// summary
let summary = document.getElementById("summary")

// ==========================
// HÀM CHUYỂN STEP
// ==========================

function showStep(step){

step1.classList.remove("active")
step2.classList.remove("active")
step3.classList.remove("active")

document.getElementById("step"+step).classList.add("active")

// cập nhật progress bar
progressBar.style.width = (step*33)+"%"

currentStep = step

}

// ==========================
// VALIDATE STEP 1
// ==========================

function validateStep1(){

let valid = true

if(fullname.value.trim().length < 3){

nameError.innerText="Tên phải ≥3 ký tự"
valid=false

}else{

nameError.innerText=""

}

if(birth.value===""){

birthError.innerText="Chọn ngày sinh"
valid=false

}else{

birthError.innerText=""

}

if(gender.value===""){

genderError.innerText="Chọn giới tính"
valid=false

}else{

genderError.innerText=""

}

return valid

}

// ==========================
// VALIDATE STEP 2
// ==========================

function validateStep2(){

let valid=true

let emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailRegex.test(email.value)){

emailError.innerText="Email không hợp lệ"
valid=false

}else{

emailError.innerText=""

}

if(password.value.length<6){

passError.innerText="Mật khẩu ≥6 ký tự"
valid=false

}else{

passError.innerText=""

}

if(password.value!==confirmPass.value){

confirmError.innerText="Không khớp mật khẩu"
valid=false

}else{

confirmError.innerText=""

}

return valid

}

// ==========================
// NÚT NEXT STEP 1
// ==========================

document.getElementById("next1").onclick=function(){

if(validateStep1()){

showStep(2)

}

}

// ==========================
// NÚT BACK STEP 2
// ==========================

document.getElementById("back1").onclick=function(){

showStep(1)

}

// ==========================
// NÚT NEXT STEP 2
// ==========================

document.getElementById("next2").onclick=function(){

if(validateStep2()){

// hiển thị summary

summary.innerHTML=
"Họ tên: "+fullname.value+"<br>"+
"Ngày sinh: "+birth.value+"<br>"+
"Giới tính: "+gender.value+"<br>"+
"Email: "+email.value

showStep(3)

}

}

// ==========================
// BACK STEP 3
// ==========================

document.getElementById("back2").onclick=function(){

showStep(2)

}

// ==========================
// SUBMIT
// ==========================

document.getElementById("multiForm").addEventListener("submit",function(e){

e.preventDefault()

alert("Đăng ký thành công 🎉")

})