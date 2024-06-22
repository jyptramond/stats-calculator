const button = document.getElementById("generate");
const result = document.getElementById("resultValue")
const bonus = document.getElementById("bonus")


const dices = document.getElementById("dices")
const diceType = document.getElementById("diceType");
const importantDices = document.getElementById("importantDices")
const times = document.getElementById("times")

launch();
checkLength(dices,5)
checkLength(diceType,3)
checkLength(times,5);
checkLength(importantDices,5)


function checkLength(target,limit) {
    target.addEventListener('input', function() {

        let value = this.value;
        console.log(this.value)
        let isValid = /^\d*$/.test(value);
        if (!isValid) {
            this.value = value.replace(/\D/g, '');
            document.getElementById('error').style.display = 'inline';
        } else {
            document.getElementById('error').style.display = 'none';
        }


        if (this.value.length > limit) {
            this.value = this.value.slice(0, limit);
        }
        
    });
}


function launch() {
    button.addEventListener('click', function() {

        let random = 0;
        let timesArray = [];
        let i = 0;

            if (!Number.isInteger(Number(times.value))) {
                times.value = 1;
            }

            for (i = 0 ; i < times.value ; i++) {
                if (!importantDices.value) {
                    random = getRandomDices(diceType.value, dices)
                }
                else {
                    random = getRandomDicesMore(diceType.value, dices, importantDices)
                }
                timesArray.push(random)
            }
            const total = timesArray.reduce((acc, value) => acc + value, 0);
            const average = total/times.value;
            const myResult = average.toFixed(1).replace(/\.?0+$/, '');
            
            result.innerHTML = myResult;
            
        });
}



function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
  }

function getRandomDices(max, dices) {
    let total = 0

    for (let i= 0 ; i < dices.value ; i++) {
        total += getRandomInt(max);
    }


    return total
}

function getRandomDicesMore(max, dices, importantDices) {

    let array = [];
    let newArray = [];
    let i = 0;
    let length = 0;

    for (i= 0 ; i < dices.value ; i++) {
        array.push(getRandomInt(max));
    }

    //console.log("résultats")
    //console.log(array)
    
    if (bonus.checked) {
        array.sort((a, b) => b - a)
    }
    else {
        array.sort((a, b) => a - b)
    }

    //console.log("triés")
    //console.log(array)
    
    if (importantDices.value > dices.value) {
        length = dices.value;
    } else {
        length = importantDices.value;
    }

    for (i = 0 ; i < length ; i++) {
        newArray.push(array[i]);
    }

    //console.log("dés conservés :")
    //console.log(newArray);
    const total = newArray.reduce((acc, value) => acc + value, 0);

    return total
}