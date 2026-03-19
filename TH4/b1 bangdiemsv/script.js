let nameInput = document.getElementById("name")
let scoreInput = document.getElementById("score")
let addBtn = document.getElementById("addBtn")

let tableBody = document.getElementById("tableBody")
let stats = document.getElementById("stats")

let students = []
let filteredStudents = []
let sortAsc = true

let searchInput = document.getElementById("search")
let filterSelect = document.getElementById("filter")
let sortScore = document.getElementById("sortScore")

function getRank(score){

if(score >= 8.5) return "Giỏi"
if(score >= 7) return "Khá"
if(score >= 5) return "Trung bình"
return "Yếu"

}

// THÊM SINH VIÊN
addBtn.addEventListener("click", function(){

let name = nameInput.value.trim()
let score = parseFloat(scoreInput.value)

if(name === "" || isNaN(score) || score < 0 || score > 10){

alert("Dữ liệu không hợp lệ")
return

}

students.push({
name: name,
score: score
})

nameInput.value = ""
scoreInput.value = ""
nameInput.focus()

applyFilters()

})

function renderTable(){

tableBody.innerHTML = ""

// HIỂN THỊ KHI KHÔNG CÓ KẾT QUẢ
if(filteredStudents.length === 0){

tableBody.innerHTML =
"<tr><td colspan='5'>Không có kết quả</td></tr>"

updateStats()
return

}

filteredStudents.forEach(function(s, index){

let tr = document.createElement("tr")

let rank = getRank(s.score)

tr.innerHTML = `
<td>${index+1}</td>
<td>${s.name}</td>
<td>${s.score}</td>
<td>${rank}</td>
<td><button onclick="deleteStudent(${students.indexOf(s)})">Xóa</button></td>
`

if(s.score < 5){
tr.style.background = "yellow"
}

tableBody.appendChild(tr)

})

updateStats()

}

function deleteStudent(index){

students.splice(index,1)

applyFilters()

}

function updateStats(){

let total = students.length

let sum = 0

students.forEach(function(s){
sum += s.score
})

let avg = total ? sum/total : 0

stats.innerText =
"Tổng SV: " + total + " | Điểm TB: " + avg.toFixed(2)

}

// ENTER ĐỂ THÊM
scoreInput.addEventListener("keyup", function(e){

if(e.key === "Enter"){
addBtn.click()
}

})

// ===== BÀI 1.2 =====

function applyFilters(){

let keyword = searchInput.value.toLowerCase()
let filter = filterSelect.value

filteredStudents = students.filter(function(s){

let matchName = s.name.toLowerCase().includes(keyword)

let rank = getRank(s.score)

let matchRank = (filter === "all" || rank === filter)

return matchName && matchRank

})

// SẮP XẾP
filteredStudents.sort(function(a,b){

return sortAsc ? a.score - b.score : b.score - a.score

})

renderTable()

}

// SỰ KIỆN
searchInput.addEventListener("input", applyFilters)

filterSelect.addEventListener("change", applyFilters)

sortScore.addEventListener("click", function(){

sortAsc = !sortAsc

sortScore.innerHTML =
"Điểm " + (sortAsc ? "▲" : "▼")

applyFilters()

})

// LOAD BAN ĐẦU
applyFilters()