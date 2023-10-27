function readNumber() {
    
    let number;

    do {
        
        number = prompt("Escribe un numero: ");
        console.log(number);

    } while (number !== null && !isFinite(number));

    return number == null ? null : +number;
}

alert(readNumber())