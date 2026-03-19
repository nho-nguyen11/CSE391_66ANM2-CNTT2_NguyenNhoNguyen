// ======================
// LẤY ELEMENT
// ======================

let fullname = document.getElementById("fullname")
let nameCounter = document.getElementById("nameCounter")

let password = document.getElementById("password")
let confirmPass = document.getElementById("confirm")

let togglePass = document.getElementById("togglePass")

let strengthFill = document.getElementById("strengthFill")
let strengthText = document.getElementById("strengthText")


// ======================
// ĐẾM KÝ TỰ HỌ TÊN
// ======================

fullname.addEventListener("input",function(){

let len = fullname.value.length

// cập nhật số ký tự
nameCounter.innerText = len + "/50"

})


// ======================
// HIỂN / ẨN MẬT KHẨU
// ======================

togglePass.onclick=function(){

// nếu đang password -> chuyển sang text
if(password.type === "password"){

password.type = "text"

}else{

password.type = "password"

}

}


// ======================
// PASSWORD STRENGTH BAR
// ======================

password.addEventListener("input",function(){

let value = password.value

let strength = 0

// kiểm tra chữ thường
if(/[a-z]/.test(value)) strength++

// kiểm tra chữ hoa
if(/[A-Z]/.test(value)) strength++

// kiểm tra số
if(/[0-9]/.test(value)) strength++

// kiểm tra ký tự đặc biệt
if(/[^A-Za-z0-9]/.test(value)) strength++

// kiểm tra độ dài
if(value.length >= 8) strength++


// ===== xác định mức độ =====

if(strength <=2){

strengthFill.style.width="33%"
strengthFill.style.background="red"
strengthText.innerText="Yếu"

}

else if(strength <=4){

strengthFill.style.width="66%"
strengthFill.style.background="orange"
strengthText.innerText="Trung bình"

}

else{

strengthFill.style.width="100%"
strengthFill.style.background="green"
strengthText.innerText="Mạnh"

}

})


// ======================
// VALIDATE FORM
// ======================

document.getElementById("registerForm").addEventListener("submit",function(e){

e.preventDefault()

// kiểm tra confirm password
if(password.value !== confirmPass.value){

document.getElementById("confirmError").innerText="Mật khẩu không khớp"

}else{

document.getElementById("confirmError").innerText=""

alert("Đăng ký thành công 🎉")

}

})