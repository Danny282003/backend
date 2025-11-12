function getCoffee() {
    console.log('Getting coffee')
    doAsyncStuff(()=>{
        console.log('Coffee is here')
    })
}

function singASong(){
    console.log('Start Singing')
}

function doAsyncStuff() {
    setTimeout(()=>{
        console.log('Doing asychronous stuffs')
    }, 2000)
}

