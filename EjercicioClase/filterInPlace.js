const filterRange = (arr,a,b) => {
    // for (let i = arr.length-1; i >= 0; i--) 
    // {
    //     const element = arr[i];

    //     if(element < a || element > b)
    //     {
    //         arr.splice(i,1);
    //     }
    // }

    let arrTemp = [];
    let element;
    while (element = arr.pop())
    {
        if(element >= a && element <= b)
        {
            arrTemp.push(element);
        }
    };

    for (let i = 0; i < arrTemp.length; i++) {
        arr.push(arrTemp[i]);
    }
};

const arr = [5,3,8,1];

console.log(arr);

filterRange(arr,1,4);

console.log(arr);