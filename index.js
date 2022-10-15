
function coloring() {
    var bl = true;
    let cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        if(index % 8 != 0){
            bl = !bl;
        }
        if(bl){
            cell.style.backgroundColor = "#f0d9b5";
        }
        else{
            cell.style.backgroundColor = "#b58863";
        }
        if(cell.innerText == "circle"){
            cell.innerHTML = "";
        }
    })
}

function insertImages() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if(cell.innerText != 0){
            cell.innerHTML = `${cell.innerText}<img src='images/${cell.innerText}.png'>`;
        }

    })

}

function colorMove(x,y) {
    if(x >=1 && x <= 8 && y >= 1 && y <= 8){
        let cell = document.getElementById("c"+x.toString()+y.toString()); 
        if(cell.innerText != 0){
            cell.style.backgroundColor = '#646f40';
        }
        else{
            cell.innerHTML = `circle<img class='circle' src='images/circle.svg'>`;
        }
    }
}

function get(x,y) {
    if(x >=1 && x <= 8 && y >= 1 && y <= 8) {
        let cell = document.getElementById("c"+x.toString()+y.toString());
        if(cell.innerText == "circle"){
            return "";
        }
        return cell.innerText;
    }
    return ""; 
}

function move(x1,y1,x2,y2) {
    let cell1 = document.getElementById("c"+x1.toString()+y1.toString());
    let cell2 = document.getElementById("c"+x2.toString()+y2.toString());
    let k = cell2.innerText;
    cell2.innerText = cell1.innerText;
    cell1.innerText = "";
    chance = !chance;
    if(chance) document.getElementById("turn").innerText = "White's Turn";
    else document.getElementById("turn").innerText = "Black's Turn";
    if(cell2.innerText == "Wpawn" && x2 == 8) cell2.innerText = "Wqueen";
    if(cell2.innerText == "Bpawn" && x2 == 1) cell2.innerText = "Bqueen";
    if(k == "Wking"){
        alert("Black Wins");
        start();
    } 
    else if(k == "Bking") {
        alert("White Wins");
        start();
    }
    let audio = new Audio("move.mp3");
    audio.play();
    insertImages();
    
}

// move(2,1,7,1);

var moveX = 0;
var moveY = 0;
var chance = true;

function main() {
    coloring();
    insertImages();
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
            cell.addEventListener('click', function() {
                console.log(cell.style.backgroundColor)
                console.log(cell.innerText)
                if(chance && cell.innerText.startsWith('B') && cell.style.backgroundColor != 'rgb(100, 111, 64)') return;
                if(!chance && cell.innerText.startsWith('W') && cell.style.backgroundColor != 'rgb(100, 111, 64)') return;
                if(cell.innerText != "circle" && cell.style.backgroundColor != "rgb(100, 111, 64)"){
                    coloring();
                    cell.style.backgroundColor = 'rgba(0,0,0,0.2)';
                }
                
                let p = Array.from(cell.id);
                p.shift();
                let x = +p[0];
                let y = +p[1];
                if(cell.innerText == "circle" || cell.style.backgroundColor == "rgb(100, 111, 64)"){
                    move(moveX, moveY, x,y)
                    coloring();
                }
                else if(cell.innerText == "Wpawn"){
                    if(get(x+1,y) == 0){
                        colorMove(x+1,y);
                    }
                    if(x==2 && get(x+1,y) == 0){
                        colorMove(x+2,y);
                    }
                    if(get(x+1,y-1) != 0 && get(x+1,y-1)[0] != get(x,y)[0]){
                        colorMove(x+1,y-1);
                    }
                    if(get(x+1,y+1) != 0 && get(x+1,y+1)[0] != get(x,y)[0]){
                        colorMove(x+1,y+1);
                    }

                }
                else if(cell.innerText == "Bpawn"){
                    if(get(x-1,y) == 0){
                        colorMove(x-1,y);
                    }
                    if(x==7 && get(x-1,y) == 0){
                        colorMove(x-2,y);
                    }
                    if(get(x-1,y-1) != 0){
                        colorMove(x-1,y-1);
                    }
                    if(get(x-1,y+1) != 0){
                        colorMove(x-1,y+1);
                    }
                }
                else if(cell.innerText == "Wknight" || cell.innerText == "Bknight"){
                    console.log('c'+(x+2).toString()+(y-1).toString());
                    if(get(x,y)[0] != get(x+2,y+1)[0]) colorMove(x+2,y+1);
                    if(get(x,y)[0] != get(x-2,y+1)[0]) colorMove(x-2,y+1);
                    if(get(x,y)[0] != get(x+2,y-1)[0]) colorMove(x+2,y-1);
                    if(get(x,y)[0] != get(x-2,y-1)[0]) colorMove(x-2,y-1);
                    if(get(x,y)[0] != get(x+1,y+2)[0]) colorMove(x+1,y+2);
                    if(get(x,y)[0] != get(x-1,y+2)[0]) colorMove(x-1,y+2);
                    if(get(x,y)[0] != get(x-1,y-2)[0]) colorMove(x-1,y-2);
                    if(get(x,y)[0] != get(x+1,y-2)[0]) colorMove(x+1,y-2);
                }
                else if(cell.innerText == "Wrook" || cell.innerText == "Brook") {
                    for(let i=1;i<8;i++){
                        if(get(x,y)[0] == get(x+i,y)[0]) break;
                        colorMove(x+i,y);
                        if(get(x+i,y)!=0 ) break;
                    }
                    for(let i=1;i<8;i++){
                        if(get(x,y)[0] == get(x-i,y)[0]) break;
                        colorMove(x-i,y);
                        if(get(x-i,y)!=0) break;
                    }
                    for(let i=1;i<8;i++){
                        if(get(x,y)[0] == get(x,y+i)[0]) break;
                        colorMove(x,y+i);
                        if(get(x,y+i)!=0) break;
                    }
                    for(let i=1;i<8;i++){
                        if(get(x,y)[0] == get(x,y-i)[0]) break;
                        colorMove(x,y-i);
                        if(get(x,y-i)!=0) break;
                    }
                }
                else if(cell.innerText == "Wking" || cell.innerText == "Bking") {
                    if(get(x,y)[0] != get(x+1,y)[0]) colorMove(x+1,y)
                    if(get(x,y)[0] != get(x-1,y)[0]) colorMove(x-1,y)
                    if(get(x,y)[0] != get(x+1,y+1)[0]) colorMove(x+1,y+1)
                    if(get(x,y)[0] != get(x-1,y+1)[0]) colorMove(x-1,y+1)
                    if(get(x,y)[0] != get(x+1,y-1)[0]) colorMove(x+1,y-1)
                    if(get(x,y)[0] != get(x-1,y-1)[0]) colorMove(x-1,y-1)
                    if(get(x,y)[0] != get(x,y+1)[0]) colorMove(x,y+1)
                    if(get(x,y)[0] != get(x,y-1)[0]) colorMove(x,y-1)
                }
                else if(cell.innerText == "Wbishop" || cell.innerText == "Bbishop") {
                    for(let i=1;i<=7;i++){
                        if(get(x,y)[0] == get(x+i,y+i)[0]) break;
                        colorMove(x+i,y+i);
                        if(get(x+i,y+i)!=0) break;
                    }
                    for(let i=1;i<=7;i++){
                        if(get(x,y)[0] == get(x-i,y-i)[0]) break;
                        colorMove(x-i,y-i);
                        if(get(x-i,y-i)!=0) break;
                    }
                    for(let i=1;i<=7;i++){
                        if(get(x,y)[0] == get(x+i,y-i)[0]) break;
                        colorMove(x+i,y-i);
                        if(get(x+i,y-i)!=0) break;
                    }
                    for(let i=1;i<=7;i++){
                        if(get(x,y)[0] == get(x-i,y+i)[0]) break;
                        colorMove(x-i,y+i);
                        if(get(x-i,y+i)!=0) break;
                    }
                }
                else if(cell.innerText == "Wqueen" || cell.innerText == "Bqueen") {
                    for(let i=1;i<8;i++){
                        if(get(x,y)[0] == get(x+i,y)[0]) break;
                        colorMove(x+i,y);
                        if(get(x+i,y)!=0) break;
                    }
                    for(let i=1;i<8;i++){
                        if(get(x,y)[0] == get(x-i,y)[0]) break;
                        colorMove(x-i,y);
                        if(get(x-i,y)!=0) break;
                    }
                    for(let i=1;i<8;i++){
                        if(get(x,y)[0] == get(x,y+i)[0]) break;
                        colorMove(x,y+i);
                        if(get(x,y+i)!=0) break;
                    }
                    for(let i=1;i<8;i++){
                        if(get(x,y)[0] == get(x,y-i)[0]) break;
                        colorMove(x,y-i);
                        if(get(x,y-i)!=0) break;
                    }
                    for(let i=1;i<=7;i++){
                        if(get(x,y)[0] == get(x+i,y+i)[0]) break;
                        colorMove(x+i,y+i);
                        if(get(x+i,y+i)!=0) break;
                    }
                    for(let i=1;i<=7;i++){
                        if(get(x,y)[0] == get(x-i,y-i)[0]) break;
                        colorMove(x-i,y-i);
                        if(get(x-i,y-i)!=0) break;
                    }
                    for(let i=1;i<=7;i++){
                        if(get(x,y)[0] == get(x+i,y-i)[0]) break;
                        colorMove(x+i,y-i);
                        if(get(x+i,y-i)!=0) break;
                    }
                    for(let i=1;i<=7;i++){
                        if(get(x,y)[0] == get(x-i,y+i)[0]) break;
                        colorMove(x-i,y+i);
                        if(get(x-i,y+i)!=0) break;
                    }
                }
                moveX = x;
                moveY = y;
            })
    })
}

var board = [   "Brook","Bknight","Bbishop","Bqueen","Bking","Bbishop","Bknight","Brook",
                "Bpawn","Bpawn","Bpawn","Bpawn","Bpawn","Bpawn","Bpawn","Bpawn",
                "","","","","","","","",
                "","","","","","","","",
                "","","","","","","","",
                "","","","","","","","",
                "Wpawn","Wpawn","Wpawn","Wpawn","Wpawn","Wpawn","Wpawn","Wpawn",
                "Wrook","Wknight","Wbishop","Wqueen","Wking","Wbishop","Wknight","Wrook"
            ]

function start() {
    chance = true;
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.innerText = board[index];
    })
    main();
}

start()