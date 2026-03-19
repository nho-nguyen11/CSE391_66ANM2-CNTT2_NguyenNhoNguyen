// ============================
// LẤY CÁC PHẦN TỬ HTML
// ============================

let form = document.getElementById("orderForm") // form đặt hàng

let productEl = document.getElementById("product") // dropdown sản phẩm
let quantityEl = document.getElementById("quantity") // ô nhập số lượng
let dateEl = document.getElementById("date") // ngày giao
let addressEl = document.getElementById("address") // địa chỉ giao
let noteEl = document.getElementById("note") // ghi chú

let totalPrice = document.getElementById("totalPrice") // hiển thị tổng tiền
let counter = document.getElementById("counter") // đếm ký tự ghi chú

// span hiển thị lỗi
let productError = document.getElementById("productError")
let quantityError = document.getElementById("quantityError")
let dateError = document.getElementById("dateError")
let addressError = document.getElementById("addressError")
let noteError = document.getElementById("noteError")
let payError = document.getElementById("payError")

// phần xác nhận đơn hàng
let confirmBox = document.getElementById("confirmBox")
let summary = document.getElementById("summary")

let confirmBtn = document.getElementById("confirmBtn")
let cancelBtn = document.getElementById("cancelBtn")

let successMsg = document.getElementById("successMsg")

// ============================
// OBJECT GIÁ SẢN PHẨM
// ============================

const prices = {
Ao:150000,
Quan:200000,
Giay:300000
}

// ============================
// TÍNH TỔNG TIỀN
// ============================

function updateTotal(){

let product = productEl.value
let quantity = Number(quantityEl.value)

if(prices[product] && quantity){

let total = prices[product] * quantity

// format tiền kiểu VN
totalPrice.innerText = total.toLocaleString("vi-VN")

}else{

totalPrice.innerText = 0

}

}

// sự kiện khi thay đổi sản phẩm hoặc số lượng
productEl.addEventListener("change", updateTotal)
quantityEl.addEventListener("input", updateTotal)


// ============================
// ĐẾM KÝ TỰ GHI CHÚ REALTIME
// ============================

noteEl.addEventListener("input", function(){

let len = noteEl.value.length

counter.innerText = len + "/200"

if(len > 200){

counter.style.color = "red"
noteError.innerText = "Tối đa 200 ký tự"

}else{

counter.style.color = "black"
noteError.innerText = ""

}

})


// ============================
// VALIDATE SẢN PHẨM
// ============================

function validateProduct(){

if(productEl.value === ""){

productError.innerText = "Vui lòng chọn sản phẩm"
return false

}

productError.innerText = ""
return true

}


// ============================
// VALIDATE SỐ LƯỢNG
// ============================

function validateQuantity(){

let q = Number(quantityEl.value)

if(!Number.isInteger(q) || q < 1 || q > 99){

quantityError.innerText = "Số lượng từ 1 đến 99"
return false

}

quantityError.innerText = ""
return true

}


// ============================
// VALIDATE NGÀY GIAO
// ============================

function validateDate(){

let selected = new Date(dateEl.value)

let today = new Date()

// ngày tối đa = hôm nay + 30 ngày
let max = new Date()
max.setDate(today.getDate()+30)

if(dateEl.value === ""){

dateError.innerText="Chọn ngày giao"
return false

}

if(selected < today){

dateError.innerText="Không chọn ngày quá khứ"
return false

}

if(selected > max){

dateError.innerText="Không quá 30 ngày"
return false

}

dateError.innerText=""
return true

}


// ============================
// VALIDATE ĐỊA CHỈ
// ============================

function validateAddress(){

let value = addressEl.value.trim()

if(value.length < 10){

addressError.innerText="Địa chỉ ít nhất 10 ký tự"
return false

}

addressError.innerText=""
return true

}


// ============================
// VALIDATE PHƯƠNG THỨC THANH TOÁN
// ============================

function validatePay(){

let pay = document.querySelector("input[name='pay']:checked")

if(!pay){

payError.innerText="Chọn phương thức thanh toán"
return false

}

payError.innerText=""
return true

}


// ============================
// VALIDATE GHI CHÚ
// ============================

function validateNote(){

let len = noteEl.value.length

if(len > 200){

noteError.innerText="Tối đa 200 ký tự"
return false

}

noteError.innerText=""
return true

}


// ============================
// SUBMIT FORM
// ============================

form.addEventListener("submit",function(e){

e.preventDefault() // chặn submit

// gọi tất cả hàm validate
let valid =
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePay()

// nếu hợp lệ
if(valid){

showConfirm()

}

})


// ============================
// HIỂN THỊ HỘP XÁC NHẬN
// ============================

function showConfirm(){

confirmBox.style.display="block"

summary.innerHTML =
"Sản phẩm: "+productEl.value+
"<br>Số lượng: "+quantityEl.value+
"<br>Tổng tiền: "+totalPrice.innerText+" đ"+
"<br>Ngày giao: "+dateEl.value

}


// ============================
// NÚT XÁC NHẬN ĐẶT HÀNG
// ============================

confirmBtn.onclick=function(){

confirmBox.style.display="none"

successMsg.innerText="Đặt hàng thành công 🎉"

// ẩn form
form.style.display="none"

}


// ============================
// NÚT HỦY
// ============================

cancelBtn.onclick=function(){

confirmBox.style.display="none"

}