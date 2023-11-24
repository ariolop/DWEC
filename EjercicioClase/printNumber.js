let from = 1;
let to = 5;
let timerId;

function printInterval() {
    if(from <= to)
    {
        console.log(from++);
    }   
    else
    {
        clearInterval(timerId);
    }
}

function printNumbers() {
    if(Number.isFinite(from) && Number.isFinite(to))
    {
        timerId = setInterval(printInterval , 1000);
    }
}

function printTimeout(from, to)
{
    if(from <= to)
    {
        setTimeout(() => {
            console.log(from++);
            setTimeout(printTimeout(from, to), 1000);
        }, 1000);
    }
}

printNumbers();
