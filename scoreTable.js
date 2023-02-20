class winner{
    constructor(name,option,time) {
        this.name=name;
        this.option=option;
        this.time=time
    }
    getName(){
        return this.name
}
    getOption(){
        return this.option
    }
    getTime(){
        return this.time
    }
}
let arr=[];
function addWinner(){
    let name=document.getElementById("name").value;
    let winner1=new winner(name,document.getElementById("sel").value,document.getElementById("solvingtime").innerText)
    arr[arr.length]=winner1;
    display()
}
function display(arr){
    let a="table id='tb3'";
    a+="<tr><th>Stt</th><th>Tên</th><th>Thời gian</th></tr>"
    for (let i=0;i<arr.length;i++){
        a+="<tr>";
        a+="<td>"+(i+1)+"</td>";
        a+="<td>"+arr[i].getName()+"</td>";
        a+="<td>"+arr[i].getOption()+"</td>";
        a+="<td>"+arr[i].getTime()+"</td>";
        a+="</tr>";
    }

}
