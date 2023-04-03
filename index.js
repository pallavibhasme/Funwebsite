const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//lets create a fun to initin game

function initGame(){
    currentPlayer = "x";
    gameGrid = ["","","","","","","","",""];
    //ui pr bhi empty karna padega na
    boxes.forEach((box , index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = 'all';
        //initialise boxes with css property again
        box.classList =`box box${index + 1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer === "x") {
        currentPlayer = "o";
    }
    else {
        currentPlayer = "x";
    }
    //ui updates
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function checkGameOver() {
    let answer = "";

    winningPositions.forEach ((position) => {
        // all the box shoud non- empty and equal in value
        if ((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]]  !=="")
        && (gameGrid[position[0]] === gameGrid[position[1]])  && (gameGrid[position[1]] === gameGrid[position[2]]) ){


            //check if winner is X
            if(gameGrid[position[0]] ==="x")
                answer = "x";
            else 
                answer = "o";

            //disable pointer event
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })


            //now we know x or o is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
       
        }
    });
    //it means we have winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // when there is no winner!!!!!!!!!!! let's check tied
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !=="")
            fillCount++;
    });
    //game tied!
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active")
    }

   
}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn ();
        //check koi heet to nhi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click" , initGame);