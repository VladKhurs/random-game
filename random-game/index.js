addEventListener('DOMContentLoaded', (event) => {
    const snakeField = document.querySelector('.snake-field')
    const gameContext = snakeField.getContext('2d')
    const playBtn = document.querySelector('.play-btn')
    const replayMenu = document.querySelector('.replay-menu')
    const recordsMenu = document.querySelector('.records-menu')
    const welcomeMenu = document.querySelector('.welcom-menu')
    const scoreAmount = document.querySelector('.score-amount')
    const tableRecords = document.querySelectorAll('.table-record')
    const tableToWelconeBtn = document.querySelector('.close-table')
    const welconeToTable = document.querySelector('.records-btn')
    const startBtn = document.querySelector('.start-btn')
    const playToWelcomeBtn = document.querySelector('.play-to-welcome-btn')
    const tableToGameBtn = document.querySelector('.play-again-btn')
    tableRecords[0].innerHTML = 10
    const fieldImg = new Image()
    const foodImg = new Image()

    const eatAud = new Audio()
    const leftAud = new Audio()
    const rightAud = new Audio()
    const topAud = new Audio()
    const downAud = new Audio()
    const deadAud = new Audio()

    const pix = 32



    if(localStorage.getItem('localResults') === null){
        let scriptResults = []
        localStorage.setItem('localResults', JSON.stringify(scriptResults))
    }


    let takenResults = localStorage.getItem('localResults')
    takenResults = JSON.parse(takenResults)
    let takenResultsBefore = takenResults
    for(let i = 0; i < takenResults.length; i++){
        tableRecords[i].innerHTML = takenResults[i]
    }

    fieldImg.src="./assets/img/field.png"
    foodImg.src="./assets/img/carrot.png"

    eatAud.src ="./assets/audio/eating.mp3"
    deadAud.src ="./assets/audio/deth.aac"
    leftAud.src ="./assets/audio/left.aac"
    rightAud.src ="./assets/audio/right.aac"
    topAud.src ="./assets/audio/top.aac"
    downAud.src ="./assets/audio/down.aac"

    let game
    let snake = []
    let score = 0
    let direction = ''
    let isDeath = false
    snake[0] = {
        x: 10 * pix,
        y: 10 * pix
    }

    let food = {
        x: Math.floor(Math.random()*17 + 1) * pix,
        y: Math.floor(Math.random()*15 + 3) * pix
    }

    let isAgain = true
    let isInCounter = 0
    let countWhile = 0
    let foodInSnake = () => {
        isAgain = true
        isInCounter = 0
        countWhile = 0
        while(isAgain){
            countWhile++
            for(let i = 0; i < snake.length; i++){
                isInCounter++
                if(snake[i].x === food.x && snake[i].y === food.y){
                    food = {
                        x: Math.floor(Math.random()*17 + 1) * pix,
                        y: Math.floor(Math.random()*15 + 3) * pix
                    }
                    i = snake.length
                }
            }
            if(isInCounter === snake.length){
                isAgain = false
            }
            if(countWhile === 3){
                isAgain = false
            }
            //console.log('while')
        }
    }

    let startNewGame = () => {
        isDeath = false
        snake = [{
            x: 10 * pix,
            y: 10 * pix
        }]
        score = 0
        direction = ''
        food = {
            x: Math.floor(Math.random()*17 + 1) * pix,
            y: Math.floor(Math.random()*15 + 3) * pix
        }
        foodInSnake()
        gameContext.drawImage(foodImg, food.x, food.y)

        /*let takenResults = localStorage.getItem('localResults')
        takenResults = JSON.parse(takenResults)
        console.log(takenResults.length)*/

        game = setInterval(draw, 100)
    }

    let showReplayMenu = () => {
        replayMenu.classList.toggle('hide')
        snakeField.classList.toggle('hide')
        startNewGame()
    }

    let showWelcomeMenu = () => {
        recordsMenu.classList.toggle('hide')
        welcomeMenu.classList.toggle('hide')
    }

    let showTable = () => {
        recordsMenu.classList.toggle('hide')
        welcomeMenu.classList.toggle('hide')
    }

    let showGame = () => {
        snakeField.classList.toggle('hide')
        welcomeMenu.classList.toggle('hide')
        startNewGame()
    }


    let showWelcomeFromPlay = () => {
        replayMenu.classList.toggle('hide')
        welcomeMenu.classList.toggle('hide')
    }

    let showGameFromTable = () => {
        recordsMenu.classList.toggle('hide')
        snakeField.classList.toggle('hide')
        startNewGame()
    }

    playBtn.addEventListener('click', showReplayMenu)
    tableToWelconeBtn.addEventListener('click', showWelcomeMenu)
    welconeToTable.addEventListener('click', showTable)
    startBtn.addEventListener('click', showGame)
    playToWelcomeBtn.addEventListener('click', showWelcomeFromPlay)
    tableToGameBtn.addEventListener('click', showGameFromTable)

    document.addEventListener('keydown', (e) => {
        if(!isDeath){
            if(e.key === 'ArrowRight' && direction != 'left') {
                direction = 'rigth'
                topAud.play()
            }
            else if(e.key === 'ArrowLeft' && direction != 'rigth'){
                direction = 'left'
                downAud.play()
            }
            else if(e.key === 'ArrowUp' && direction != 'down'){
                direction = 'top'
                topAud.play()
            }
            else if(e.key === 'ArrowDown' && direction != 'top'){
                direction = 'down'
                downAud.play()
            }
        }
    })

    const draw = () => {
        if(!isDeath){
            gameContext.drawImage(fieldImg, 0, 0)

            for(let i = 0; i < snake.length; i++){
                gameContext.fillStyle = (i == 0) ? 'green' : 'white'
                gameContext.fillRect(snake[i].x, snake[i].y, pix, pix)
                
                gameContext.strokeStyle = 'black'
                gameContext.strokeRect(snake[i].x, snake[i].y, pix, pix)
            }

            let oldHeadX = snake[0].x
            let oldHeadY = snake[0].y


            if(snake[0].x === food.x && snake[0].y === food.y){
                food = {
                    x: Math.floor(Math.random()*17 + 1) * pix,
                    y: Math.floor(Math.random()*15 + 3) * pix
                }
                foodInSnake()
                eatAud.play()
                score++
            }
            else{
                snake.pop()
            }
            
            if(direction === 'rigth') oldHeadX += pix
            if(direction === 'left') oldHeadX -= pix
            if(direction === 'top') oldHeadY -= pix
            if(direction === 'down') oldHeadY += pix

            let isCrash = () => {
                for(let i = 0; i < snake.length; i++){
                    if (oldHeadX === snake[i].x && oldHeadY === snake[i].y){
                        return true
                    }
                }
                return false
            }

            if(oldHeadX < pix || oldHeadY < 3 * pix || oldHeadX > pix * 17 || oldHeadY > pix * 17 || isCrash()){
                deadAud.play()
                isDeath = true
                takenResultsBefore = []
                for(let i = 0; i < takenResults.length; i++){
                    takenResultsBefore.push(takenResults[i])
                }
                if(score !== 0){
                    takenResults.push(score)
                }
                takenResults.sort((a, b) => b - a)
                if(takenResults.length > 10){
                    takenResults.length = 10
                }
                //console.log(takenResults)
                //console.log(takenResultsBefore)
                //console.log(takenResults === takenResultsBefore)
                if(takenResults !== takenResultsBefore){
                    //console.log('hi')
                    localStorage.setItem('localResults', JSON.stringify(takenResults))
                    for(let i = 0; i < takenResults.length; i++){
                        tableRecords[i].innerHTML = takenResults[i]
                    }
                }


                scoreAmount.innerHTML = score
                clearInterval(game)
                setTimeout(()=> {
                    snakeField.classList.toggle('hide')
                    replayMenu.classList.toggle('hide')
                }, 250)
            }

            let newHead = {
                x: oldHeadX,
                y: oldHeadY
            }

            snake.unshift(newHead)
            

            gameContext.drawImage(foodImg, food.x, food.y)
            gameContext.fillStyle = 'white'
            gameContext.font = '44px Arial one'
            gameContext.fillText(score, 2.8 * pix, 1.65 * pix)
            gameContext.fillStyle = 'white'
            gameContext.font = '44px Arial one'
            gameContext.fillText("Record: ", 11 * pix, 1.65 * pix)
            gameContext.fillStyle = 'white'
            gameContext.font = '44px Arial one'
            gameContext.fillText(takenResults[0], 15.8 * pix, 1.75 * pix)
        }
    }
})
