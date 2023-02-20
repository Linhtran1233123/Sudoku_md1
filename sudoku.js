let clock;//hiển thị thời gian
let sav1,sav2;// lưu chỉ số của ô
let a = new Array(9);
for (let i=0;i <9;i++){
    a[i]=new Array(9);
}
let debai = new Array(9);
for (let i=0;i <9;i++){
    debai[i]=new Array(9);
}
let arrsave = new Array(9);
for (let i=0;i <9;i++){
    arrsave[i]=new Array(9);
}
//hiện và ẩn hộp thoại nổi
function popup(){
    document.getElementById("mymodal").style.display= "block";

}
function hidePopup(){
    document.getElementById("mymodal").style.display= "none";
}
// Tạo mảng gốc cho đề bài
function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function khoitao(arr) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            arr[i][j] = undefined;
        }
    }
}
function checkCon(i,j){
    let check=true;
    for (let x=0;x< i;x++){
        if (a[x][j] === a[i][j]){
            check=false;
            break;
        }
    }
    if (check){
        for (let x=0;x< j;x++) {
            if (a[i][x] === a[i][j]) {
                check = false;
                break
            }
        }
    }
    if (check) {
        let index1 = i - i % 3, index2 = j - j % 3;
        for (let x = index1; x <= (index1 + 2); x++) {
            for (let y = index2; y <= (index2 + 2); y++) {
                if (!(x === i && y === j)) {
                    if (a[x][y] === a[i][j]) {
                        check = false;
                    }
                }
            }
        }
    }
    return check
}
function doneSu(){
    return a[8][8] === undefined;
}
function createSu(i,j){
    let arr=[1,2,3,4,5,6,7,8,9]
    while (arr.length > 0 && doneSu()) {
        let indexVal=random(0,arr.length-1);
        a[i][j] = arr[indexVal];
        if (checkCon(i, j)) {
            if (j < 8) {
                createSu(i, j + 1)
            } else if (i<8 && j===8){
                createSu(i + 1, 0)
            }
        }else{
            a[i][j]=undefined;
        }
        arr.splice(indexVal, 1);
    }
}
//Tạo đề bài
function  level() {
    let de = [[4, 2, 1, 3, 5, 2, 4, 2, 5], [4, 4, 3, 2, 4, 2, 3, 4, 3]];
    let tb = [[2, 4, 3, 2, 3, 3, 3, 4, 2], [3, 3, 2, 4, 1, 5, 2, 4, 3]];
    let kho = [[3, 4, 1, 3, 2, 3, 1, 5, 3], [4, 2, 2, 3, 3, 3, 2, 2, 3]];
    let ratkho = [[3, 2, 3, 1, 4, 1, 3, 2, 4], [2, 3, 2, 3, 2, 3, 2, 5, 0]];
    let lev=document.getElementById("sel").value;
    if(lev == "Dễ"){return de[random(0,1)];}
    if(lev == "Trung Bình"){return tb[random(0,1)];}
    if(lev == "Khó"){return kho[random(0,1)];}
    if(lev == "Rất Khó"){return ratkho[random(0,1)];}
}
function createGame(arr){
    khoitao(debai);
    khoitao(arrsave);
    for(let i=0;i<=6;i+=3){
        for(let j=0;j<=6;j+=3){
            let index=random(0,arr.length-1);
            for (let k=1;k<= arr[index];k++){
                let x=random(i,i+2);
                let y=random(j,j+2);
                while(debai[x][y]!= undefined){
                    x=random(i,i+2);
                    y=random(j,j+2);
                }
                debai[x][y] = a[x][y];
                arrsave[x][y]=debai[x][y];
            }
            arr.splice(index,1);
        }
    }
}
//Hiển thị đề bài
function display(){
    let data = "<table class='tb1'>";
    for (let i = 0; i < debai.length; i++) {
        data += "<tr>";
        for (let j = 0; j < debai.length; j++) {
            if (i % 3 == 2 && j % 3 == 2) {
                if (debai[i][j] == undefined) {
                    data += "<td style=\"border-right:3px solid black ;border-bottom:3px solid black ;color: royalblue;\"  id=\"vitri" + i + j + "\"  onclick='changeBk(" + i + "," + j +")'>" + "</td>"
                } else {
                    data += "<td  style=\"border-right:3px solid black ;border-bottom:3px solid black ;color: black;\" id=\"vitri" + i + j + "\"  onclick='changeBk(" + i + "," + j + ")'>" + debai[i][j] + "</td>"
                }
            } else if (i % 3 == 2) {
                if (debai[i][j] == undefined) {
                    data += "<td style=\"border-bottom:3px solid black ;color: royalblue;\"  id=\"vitri" + i + j + "\"  onclick='changeBk(" + i + "," + j +")'>" + "</td>"
                } else {
                    data += "<td  style=\"border-bottom:3px solid black ;color: black;\" id=\"vitri" + i + j + "\"  onclick='changeBk(" + i + "," + j + ")'>" + debai[i][j] + "</td>"
                }
            } else if (j % 3 == 2) {
                if (debai[i][j] == undefined) {
                    data += "<td style=\"border-right:3px solid black ;color: royalblue;\"  id=\"vitri" + i + j + "\"  onclick='changeBk(" + i + "," + j +")'>" + "</td>"
                } else {
                    data += "<td  style=\"border-right:3px solid black ;color: black;\" id=\"vitri" + i + j + "\"  onclick='changeBk(" + i + "," + j + ")'>" + debai[i][j] + "</td>"
                }
            } else {
                if (debai[i][j] == undefined) {
                    data += "<td style=\"color: royalblue;\"  id=\"vitri" + i + j + "\"  onclick='changeBk(" + i + "," + j +")'>" + "</td>"
                } else {
                    data += "<td  style=\"color: black;\" id=\"vitri" + i + j + "\"  onclick='changeBk(" + i + "," + j + ")'>" + debai[i][j] + "</td>"
                }
            }
        }
        data += "</tr>"
    }
    data += "</table>"
    document.getElementById("sudoku").innerHTML = data;
}
function  createTable() {
    clearInterval(clock );
    sav1=-1;
    sav2=-1;
    document.getElementById("pause").style.display="block";
    document.getElementById("mytime").style.display="block";
    hidePopup();
    khoitao(a);
    createSu(0, 0);
    createGame(level());
    display()
    time=0;
    clock=setInterval(countTime,1000);
}
//chơi lại màn
function resetTable(){
    clearInterval( clock);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++){
            debai[i][j]=arrsave[i][j];
        }
    }
    sav1=-1;
    sav2=-1;
    display()
    document.getElementById("pause").style.display="block";
    time=0;
    clock=setInterval(countTime,1000) ;
}
// Đoi mau back ground trong ô khi click vao
function changeColor(x,y){
    for (let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let v= document.getElementById("vitri"+i+j);
            if(v.style.backgroundColor != "red"){
                v.style.backgroundColor= "white";}
        }
    }
    for (let i=0;i< 9;i++){
        if(document.getElementById("vitri"+i+y).style.backgroundColor!= "red") {
            document.getElementById("vitri" + i + y).style.backgroundColor = "rgb(220, 219, 219)";
        }
    }
    for (let j=0;j< 9;j++) {
        if (document.getElementById("vitri" + x + j).style.backgroundColor != "red") {
            document.getElementById("vitri" + x + j).style.backgroundColor = "rgb(220, 219, 219)";
        }
    }
    let index1 = x - x % 3, index2 = y - y % 3;
    for (let i = index1; i <= (index1 + 2); i++) {
        for (let j = index2; j <= (index2 + 2); j++) {
            if (document.getElementById("vitri" + i + j).style.backgroundColor != "red") {
                document.getElementById("vitri" + i + j).style.backgroundColor = "rgb(220, 219, 219)";
            }
        }
    }
    if(document.getElementById("vitri"+x+y).style.backgroundColor!= "red") {
        document.getElementById("vitri" + x + y).style.backgroundColor = "rgb(190, 219, 219)";
    }
}
// Hiển thị trạng thái của nút tìm lỗi
let eye=false;
function findError(){
    let m=document.getElementById("smarteye");
    if (!eye){
        m.style.outlineColor="blue";
        eye=true;
        turnRed(sav1,sav2);
    }else {
        m.style.outlineColor="white";
        eye=false;
        for (let c = 0; c < 9; c++) {
            for (let b = 0; b < 9; b++) {
                document.getElementById("vitri" + c+ b).style.backgroundColor = "white"
                changeColor(sav1,sav2);
            }
        }
    }
}
//kiểm tra thỏa mãn điều kiện của từng ô
function checkError1(c,b){
    if (debai[c][b] !== undefined) {
        for (let x = 0; x < 9; x++) {
            if (debai[x][b] == debai[c][b] && x != c) {
                return false;
            }
        }
        for (let x = 0; x < 9; x++) {
            if (debai[c][x] == debai[c][b] && x != b) {
                return false;
            }
        }
        let index1 = c - c % 3, index2 = b - b % 3;
        for (let x = index1; x <= (index1 + 2); x++) {
            for (let y = index2; y <= (index2 + 2); y++) {
                if (!(x == c && y == b)) {
                    if (debai[x][y] == debai[c][b]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
function turnRed(i,j){
    for (let c = 0; c < 9; c++) {
        for (let b = 0; b < 9; b++) {
                if (!checkError1(c,b)) {
                    document.getElementById("vitri" + c + b).style.backgroundColor = "red"
                } else if (document.getElementById("vitri" + c + b).style.backgroundColor == "red") {
                    document.getElementById("vitri" + c + b).style.backgroundColor = "white"
                }
            }
        }
    changeColor(i,j)
}
// sự kiện click vào ô
function changeBk(x,y) {
    document.removeEventListener("keydown", changeValue)
    sav1 = x;sav2 = y;
    changeColor(x, y);
    if (document.getElementById("vitri" + x + y).style.color == "royalblue") {
        document.addEventListener("keydown", changeValue)
    }
}
// Thay đổi giá trị trong ô,xóa
function changeValue(event) {
    let code = Number(event.key);
    if (code > 0 && code < 10) {
        debai[sav1][sav2] = code;
        document.getElementById("vitri" + sav1 + sav2).textContent = (code).toString();
        changeColor(sav1, sav2)
    } else if (event.key == "Delete" || event.key == "Backspace") {
        debai[sav1][sav2] = undefined;
        document.getElementById("vitri" + sav1 + sav2).textContent = "";
    }
    if (eye) {
        turnRed(sav1, sav2)
    }
}
// đưa gợi ý
function getHint(){
    debai[sav1][sav2]=a[sav1][sav2];
    document.getElementById("vitri" + sav1 + sav2).textContent =a[sav1][sav2];
    if(eye){turnRed(sav1,sav2)}
}
// Hiện bộ đếm
let time=0;
function countTime(){
    let gio= Math.floor(time/3600);
    let phut=Math.floor((time%3600)/60);
    let giay=time%60 ;
    let sol=document.getElementById("solvingtime")
    sol.innerText="";
    if (gio <=9){sol.innerText+="0"+gio+":" ;}else{sol.innerText+=gio+":";}
    if (phut <=9){sol.innerText+="0"+phut+":" ;}else{sol.innerText+=phut+":";}
    if (giay <=9){sol.innerText+="0"+giay;}else{sol.innerText+=giay;}
    time+=1;
}
function pauseTime(){
    clearInterval(clock);
    document.getElementById("Continue1").style.display="block"
    document.getElementById("blur1").style.filter="blur(10px)"
}
function continuePlay() {
    document.getElementById("Continue1").style.display="none"
    document.getElementById("blur1").style.filter="blur(0px)"
    clock=setInterval(countTime,1000);
}
//Hiển và ẩn thị bàn phím nổi
let status=false;
function showKeyboard(){
    if(!status){
        document.getElementById("mytb2").style.display="block";
        status=true;
    } else{
        document.getElementById("mytb2").style.display="none";
        status=false;
    }
}
// Nhập và xóa từ bàn phím nổi
function nhap(val){
    if (document.getElementById("vitri" + sav1 + sav2).style.color == "royalblue") {
        debai[sav1][sav2] = +val;
        document.getElementById("vitri" + sav1 + sav2).textContent = val;
        if (eye) {
            turnRed(sav1, sav2)
        }
    }
}
function xoa(){
    if (document.getElementById("vitri" + sav1 + sav2).style.color == "royalblue") {
        debai[sav1][sav2] = undefined;
        document.getElementById("vitri" + sav1 + sav2).textContent = "";
        if (eye) {
            turnRed(sav1, sav2)
        }
    }
}
// Hoàn thành phần chơi
function completeSudoku() {
    for (let c = 0; c < 9; c++) {
        for (let b = 0; b < 9; b++) {
            checkError1(c, b);
            if (!checkError1(c, b)) {
                return alert("Rất tiếc chưa chính xác")
            }
        }
    }
     return document.getElementById("Complete1").style.display = "block";

}
function Xacnhan(){
    document.getElementById('Complete1').style.display='none'
    clearInterval(clock);
    document.getElementById("pause").style.display="none";
}
