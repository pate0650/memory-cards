// Random Math fuction 
// to flip cards and shuffle 


function shuffle(arr) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
/**
 * insert cards
 * call classes or id to insert html
 * Get DOM element from html
 */
const icons = shuffle(["fa-fan", "fa-box-tissue", "fa-burn", "fa-battery-full", "fa-door-closed", "fa-rocket"])
const gridClasses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
const $easy = document.querySelector(".easy")
const $medium = document.querySelector(".medium")
const $hard = document.querySelector(".hard")
const $game = document.getElementById("game")
const $start = document.getElementById("start")
const $end = document.getElementById("end")
let $cards = undefined
let gameIcons = undefined
let mCard = undefined
let openCard = []

/**
 * Allow user to choose level
 * once choosen show accordingly
 */


 /*
    // make function for choosen level
    eg.Easy
    // then display cards
    //add class or remove
 */
$easy.addEventListener("click", function(e) {
    gameIcons = icons.slice(0,3)
    for(let i=0; i<3; i++){
        gameIcons.push(gameIcons[i])
    }
    gameIcons = shuffle(gameIcons)
    
    $game.classList.add("grid-6")
    $game.classList.remove("hidden")
    $start.classList.add("hidden")
    for(let i=0; i<gameIcons.length; i++){
        $game.innerHTML += `<div class="card card-1 ${gridClasses[i]}">
                                <i class="fas ${gameIcons[i]} hidden"></i>
                            </div>`
    }
    $cards = document.querySelectorAll(".card")
})

/**
 * For medium insert addtional one card 
 * double it with shuffle 
 * show cards using DOM AND CSS
 */

$medium.addEventListener("click", function(e) {
    gameIcons = icons.slice(0,4)
    for(let i=0; i<4; i++){
        gameIcons.push(gameIcons[i])
    }
    gameIcons = shuffle(gameIcons)
    $game.classList.add("grid-8")
    $start.classList.add("hidden")
    $game.classList.remove("hidden")
    for(let i=0; i<gameIcons.length; i++){
        $game.innerHTML += `<div class="card card-1 ${gridClasses[i]}">
                                <i class="fas ${gameIcons[i]} hidden"></i>
                            </div>`
    }
    $cards = document.querySelectorAll(".card")
})


/**
 * Show all card for Hard
 */

$hard.addEventListener("click", function(e) {
    gameIcons = icons
    for(let i=0; i<6; i++){
        gameIcons.push(gameIcons[i])
    }
    gameIcons = shuffle(gameIcons)
    $game.classList.add("grid-12")
    $start.classList.add("hidden")
    $game.classList.remove("hidden")
    for(let i=0; i<gameIcons.length; i++){
        $game.innerHTML += `<div class="card card-3 ${gridClasses[i]}">
                                <i class="fas ${gameIcons[i]} hidden"></i>
                            </div>`
    }
    $cards = document.querySelectorAll(".card")
})

/**
 *  Target element to check conditions
 * if match then perform animation
 * after that check for dom element 
 *  // if there remove class
 *  /// add onemore class to check added class
 * ///// IF match fade out similar cards
 */

$game.addEventListener("click", function(e) {
    if (e.target.classList.contains("card")){
        e.target.style.backgroundColor = "#eee"
        e.target.classList.add('animated', 'fast', 'flip')
        sleep(250).then(() => {e.target.firstElementChild.classList.remove("hidden")})
        if (this.classList.contains('matched')){
            alert("Please Select Another Card")
        } else {
            if (openCard.length==0) {
                openCard = e.target.firstElementChild.classList
            } else {
                let imgClass = `.${[...openCard].pop("fas")}`
                mCard = document.querySelectorAll(imgClass)
                 temp = [...e.target.firstElementChild.classList].filter((item) => {return item !== 'hidden'})
                 if (JSON.stringify(Object.values(openCard)) == JSON.stringify(temp)){
                    for(let card of mCard){
                        card.parentNode.classList.add("matched")
                    }
                    gameIcons = gameIcons.filter(function(e) {return `.${e}` !== imgClass})
                    if(gameIcons.length == 0){
                        $game.style.opacity = 0.4
                        sleep(1000).then(()=>$end.classList.remove("hidden"))
                    }
                } else {
                    sleep(1000).then(() => {
                        for(let card of mCard){
                        card.classList.add("hidden")
                        card.parentNode.classList.remove('animated', 'fast', 'flip')
                        card.parentNode.style.backgroundColor = "red"
                        e.target.style.backgroundColor = "red"
                        e.target.classList.remove('animated', 'fast', 'flip')
                        e.target.firstElementChild.classList.add("hidden")                      
                    }
                })
                }
                openCard = []
                imgClass = undefined
            }
        }
    }
})  

const $startAgain = document.getElementById("start-again")
$startAgain.addEventListener("click", function(e){
    $end.classList.add("hidden")
    $game.classList.add("hidden")
    $game.innerHTML = null
    $start.classList.remove("hidden")
    $game.classList = ["game"]
    $game.classList.add("hidden")
    $game.style.opacity = 1
})