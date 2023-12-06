
const state = {

    values:{
        score: 0,
        moves: 0,
        emojis: [
            "😎","😎","🤡","🤡","💀","💀","👹","👹","🤖","🤖","👾","👾", "👻","👻","👽","👽"
        ],
        openCards: [],
    },
    view:{
        scoreView: document.getElementById("score"),
        movesView: document.getElementById("moves"),
    }
}



let shuffleEmojis = state.values.emojis.sort(()=>(Math.random()>0.5 ? 2:-1));

for(let i=0;i<state.values.emojis.length;i++){
    let box=document.createElement("div");
    box.className = "item";
    box.id = Math.floor(Math.random()*100);
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick(){
    if(state.values.openCards.length<2){
        this.classList.add("boxOpen");
        state.values.openCards.push(this)
    }

    if(state.values.openCards.length==2){
        setTimeout(checkMatch,500);
    }

    state.values.moves += 0.5;
    state.view.movesView.textContent = state.values.moves
}

function checkMatch(){

    if(state.values.openCards[0].id==state.values.openCards[1].id && (!state.values.openCards[0].classList.contains("boxMatch")||!state.values.openCards[1].classList.contains("boxMatch"))){
        state.values.score+=0;
        state.values.openCards[0].classList.remove("boxOpen");
        state.values.openCards[1].classList.remove("boxOpen");
    }
    else if(state.values.openCards[0].innerHTML===state.values.openCards[1].innerHTML){
        state.values.openCards[0].classList.add("boxMatch");
        state.values.openCards[1].classList.add("boxMatch");   
        state.values.score+=1;
    }
    else if(state.values.openCards[0].classList.contains("boxMatch")){
        state.values.openCards[1].classList.remove("boxOpen");
        state.values.score+=0
    }
    else if(state.values.openCards[1].classList.contains("boxMatch")){
        state.values.openCards[0].classList.remove("boxOpen");
        state.values.score+=0
    }
    else{
        state.values.openCards[0].classList.remove("boxOpen");
        state.values.openCards[1].classList.remove("boxOpen");
    }

    state.view.scoreView.textContent = state.values.score
    state.values.openCards=[];

    if(document.querySelectorAll(".boxMatch").length == state.values.emojis.length){
        alert("Você Venceu!");
        setTimeout(()=>{
            location.reload();
        },1000);
    }
}