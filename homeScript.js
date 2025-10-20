let p1Name;
let p2Name;

let startBtn = document.getElementById("startBtn");

startBtn.onclick = () => {

    p1Name = document.getElementById("box1").value

    if(p1Name == "")
        p1Name = "Player-1";
    
    p2Name = document.getElementById("box2").value

    if(p2Name == "")
        p2Name = "Player-2";

    
    sessionStorage.setItem('p1Name', p1Name);
    sessionStorage.setItem('p2Name', p2Name);
}
