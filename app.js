document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50;
    let startPoint = 50
    let doodlerBottomSpace = startPoint;
    let isGameOver = false;
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = false

    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left
        doodlerBottomSpace = platforms[0].bottom + 15
        doodler.style.left = doodlerLeftSpace + "px"
        doodler.style.bottom = doodlerBottomSpace + "px"
    }

    class Platform {
        constructor(newPlatbottom) {
            this.bottom = newPlatbottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')
        }
    }
    function createPlatforms() {
        for (let i = 0; i < platformCount; i++) {

            let platformGap = 600 / platformCount;
            let platformBottom = 50 + i * platformGap

            let platform = new Platform(platformBottom)
            platform.visual.style.bottom = platform.bottom + "px"
            platform.visual.style.left = platform.left + "px"
            grid.appendChild(platform.visual)
            platform.visual.classList.add("platform")

            platforms.push(platform)
            console.log(platforms)
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 4) {
            platforms.forEach(platform => {
                platform.bottom -=4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + "px"
                if (platform.bottom < 2)
                    visual.style.display = "none"
            })
        }
    }

    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(() => {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + "px"
            if (doodlerBottomSpace > startPoint+150)
            {
                fall()
            }
        }, 30);
    }

    function fall() {
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(() => {
            doodlerBottomSpace -= 10
            doodler.style.bottom = doodlerBottomSpace + "px"
            if (doodlerBottomSpace <= 0) {
                gameOver()
            }

            platforms.forEach(platform => {
                // console.log("platform bottom: ",platform.bottom)
                // console.log("doodlerBottomSpace: ",doodlerBottomSpace)
                // console.log("platform left: ",platform.left)
                // console.log("doodlerLeftSpace: ",doodlerLeftSpace)

                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    (doodlerLeftSpace+50 >= platform.left) &&
                    (doodlerLeftSpace+ 60 <= platform.left+ 125) &&
                    (!isJumping)
                ) {
                    console.log("landed on ", platform)
                    startPoint = doodlerBottomSpace
                    jump()
                }
            })
        }, 30);
    }

    function gameOver() {
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        console.log("game over")
        isGameOver = true
    }

    function control(e) {
        if (e.key == "ArrowLeft") {
            console.log("left pressed")
        }
        if (e.key == "ArrowRight") {
            console.log("right pressed")
        }
        if (e.key == "ArrowUp") {
            console.log("up pressed")
        }
    }

    function start() {
        if (!isGameOver)
            createPlatforms()
        createDoodler()
        setInterval(movePlatforms, 30);
        jump()
    }

    start()
})