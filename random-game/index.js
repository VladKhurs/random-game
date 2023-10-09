console.log("Всё ТЗ выполнено, самооценка: 70.")
console.log("Дополнительный функционал:")
console.log("1) система уровней (Levels);")
console.log("2) возможность изменения сложности игры (Game Modes).")

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
    const levelsToWelcomeBtn = document.querySelector('.levels-to-main-btn')
    const levelsToPlayBtn = document.querySelector('.levels-to-play-btn')
    const levelsMenu = document.querySelector('.levels-menu')
    const welcomeToLevelsBtn = document.querySelector('.levels-btn')
    const modesToWelcomeBtn = document.querySelector('.modes-to-welcome')
    const modesToPlayBtn = document.querySelector('.modes-to-play')
    const modesMenu = document.querySelector('.games-mode-menu')
    const WelcomeToModeBtn = document.querySelector('.mode-btn')
    const levelsTable = document.querySelectorAll('.level')
    const levelTextNow = document.querySelector('.level-text-now')
    const replayLevel = document.querySelector('.replay-level')
    const scoreLevel = document.querySelector('.score-level')
    const scoreLevelSecond = document.querySelector('.score-level-second')

    const modeBtns = document.querySelectorAll('.game-mode-btn')

    let modeNow = 'normal'

    const modesArr = [129, 100, 60, 40]
    let modeFrames = modesArr[1]
    const modesNamesArr = ['easy', 'normal', 'hard', 'pro']

    //easyBtn.addEventListener('click', () => {

    //})

    for(let i = 0; i < modesArr.length; i++){
        modeBtns[i].addEventListener('click', () => {
            modeFrames = modesArr[i]
            for(let j = 0; j < modesArr.length; j++){
                modeBtns[j].classList.remove('mode-now')
            }
            modeBtns[i].classList.add('mode-now')
        })
    }



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

    if(localStorage.getItem('localLevels') === null){
        let scriptLevels = [1]
        localStorage.setItem('localLevels', JSON.stringify(scriptLevels))
    }


    let takenResults = localStorage.getItem('localResults')
    takenResults = JSON.parse(takenResults)
    let takenResultsBefore = takenResults

    let takenLevels = localStorage.getItem('localLevels')
    takenLevels = JSON.parse(takenLevels)
    let takenLevelsBefore = takenLevels

    for(let i = 0; i < takenResults.length; i++){
        tableRecords[i].innerHTML = takenResults[i]
    }

    let passedLevel = takenLevels[0]

    const drawLevelStyle = () => {
        for(let i = 0; i < passedLevel - 1; i++) {
            levelsTable[i].classList.add('level-passed')
        }
    
        levelsTable[passedLevel - 1].classList.add('level-now')
        levelTextNow.innerHTML = passedLevel
        replayLevel.innerHTML = passedLevel
        scoreLevel.innerHTML = passedLevel * 5
        scoreLevelSecond.innerHTML = passedLevel * 5
    }

    drawLevelStyle()

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
        takenResults = JSON.parse(takenResults)*/
        game = setInterval(draw, modeFrames)
    }

    let showReplayMenu = () => {
        replayMenu.classList.toggle('hide')
        snakeField.classList.toggle('hide')
        startNewGame()
    }

    let levelsToWelcome = () => {
        levelsMenu.classList.toggle('hide')
        welcomeMenu.classList.toggle('hide')
    }

    let levelsToPlay = () => {
        levelsMenu.classList.toggle('hide')
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

    let welcomeToLevels = () => {
        levelsMenu.classList.toggle('hide')
        welcomeMenu.classList.toggle('hide')
    }

    const modesToWelcome = () => {
        modesMenu.classList.toggle('hide')
        welcomeMenu.classList.toggle('hide')
    }

    const modesToPlay = () => {
        modesMenu.classList.toggle('hide')
        snakeField.classList.toggle('hide')
        startNewGame()
    }

    const WelcomeToMode = () => {
        welcomeMenu.classList.toggle('hide')
        modesMenu.classList.toggle('hide')
    }

    playBtn.addEventListener('click', showReplayMenu)
    tableToWelconeBtn.addEventListener('click', showWelcomeMenu)
    welconeToTable.addEventListener('click', showTable)
    startBtn.addEventListener('click', showGame)
    playToWelcomeBtn.addEventListener('click', showWelcomeFromPlay)
    tableToGameBtn.addEventListener('click', showGameFromTable)
    levelsToWelcomeBtn.addEventListener('click', levelsToWelcome)
    levelsToPlayBtn.addEventListener('click', levelsToPlay)
    welcomeToLevelsBtn.addEventListener('click', welcomeToLevels)
    modesToPlayBtn.addEventListener('click', modesToPlay)
    modesToWelcomeBtn.addEventListener('click', modesToWelcome)
    WelcomeToModeBtn.addEventListener('click', WelcomeToMode)

    


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
                if(takenResults !== takenResultsBefore){
                    localStorage.setItem('localResults', JSON.stringify(takenResults))
                    for(let i = 0; i < takenResults.length; i++){
                        tableRecords[i].innerHTML = takenResults[i]
                    }
                }

                takenLevelsBefore = []
                takenLevelsBefore.push(takenLevels[0])

                playedLevel = Math.floor(takenResults[0] / 5) + 1
                
                if(playedLevel > passedLevel){
                    passedLevel++
                    takenLevels[0] = passedLevel
                }

                if(takenLevels !== takenLevelsBefore){
                    localStorage.setItem('localLevels', JSON.stringify(takenLevels))
                    //for(let i = 0; i < takenLevels.length; i++){
                    //    tableRecords[i].innerHTML = takenLevels[i]
                    //}
                }

                drawLevelStyle()

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
            
            gameContext.fillText(takenResults[0] != undefined ? takenResults[0] : 0, 15.8 * pix, 1.75 * pix)
        }
    }
})
