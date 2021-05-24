document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 150;
    let isGameOver = false;
    let platformCount = 5
    let platforms=[]
    let upTimerId
    let downTimerId

    function createDoodler(){
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodler.style.left = doodlerLeftSpace+"px"
        doodler.style.bottom = doodlerBottomSpace+"px"
    }

    class Platform{
        constructor(newPlatbottom){
            this.bottom = newPlatbottom
            this.left = Math.random()*315
            this.visual = document.createElement('div')
        }
    }
    function createPlatforms()    {
        for(let i=0;i<platformCount;i++){
           
            let platformGap = 600/platformCount;
            let platformBottom = 50 + i*platformGap

            let platform = new Platform(platformBottom)
            platform.visual.style.bottom = platform.bottom+"px"
            platform.visual.style.left = platform.left+"px"
            grid.appendChild(platform.visual)
            platform.visual.classList.add("platform")

            platforms.push(platform)
            //console.log(platforms)
        }
    }

    function movePlatforms(){
        if(doodlerBottomSpace>200){
            platforms.forEach(platform =>{
                platform.bottom -=4
                let visual = platform.visual
                visual.style.bottom = platform.bottom+"px"
                if(platform.bottom<2)
                    visual.style.display = "none"
            })

        }
    }

    function jump(){
        clearInterval(downTimerId)
        upTimerId = setInterval(() => {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace +"px"
            if(doodlerBottomSpace>500)
                fall()
        }, 30);
    }

    function fall(){
        clearInterval(upTimerId)
        downTimerId = setInterval(() => {
            doodlerBottomSpace -= 10
            doodler.style.bottom = doodlerBottomSpace +"px" 
            if(doodlerBottomSpace <= 0)
                gameOver()
        }, 30);
    }

    function gameOver(){
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        console.log("game over")
        isGameOver = true
    }

    function start(){
    if(!isGameOver)
        createDoodler()
        createPlatforms()
        setInterval(movePlatforms,30);
        jump()
    }

    start()
})