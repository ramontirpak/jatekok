setTimeout(() => {
    document.getElementById('p1name').innerHTML = prompt('Add meg a fekete nevét:')
    document.getElementById('p2name').innerHTML = prompt('Add meg a fehér nevét:')
    if (confirm("Kezdődhet a játék?")) {
        alert = "A játék kezdődik!";
    } else {
        location.reload()
    }
}, 500)

let bPieces = 9
let wPieces = 9
let dobozok = document.getElementsByClassName("place")
let dobozKoordinatak = []
let kor = 0
// let map = [
//     ['a7', null, null, 'd7',null,null,'g7'],
//     [null, 'b6', null, 'd7',null,null,'g7'],
//     [null, null, null, 'd7',null,null,'g7'],
//     ['a4', null, null, 'd7',null,null,'g7'],
//     [null, null, null, 'd7',null,null,'g7'],
//     [null, null, null, 'd7',null,null,'g7'],
//     ['a1', null, null, 'd7',null,null,'g7']
//         ]


setTimeout(() => {
    document.getElementById('turn').innerHTML = document.getElementById('p1name').innerHTML
}, 1000);

for (let i = 0; i < dobozok.length; i++) {
    let style = window.getComputedStyle(dobozok[i])
    let top = style.getPropertyValue('top')
    let left = style.getPropertyValue('left')
    dobozKoordinatak[i] = {
        balKoord: parseInt(left),
        felsoKoord: parseInt(top),
    }
}

document.getElementById("myCanvas").onclick = function(event) {

let klikkX = event.clientX 
let klikkY = event.clientY 
console.log(document.getElementById('p1name').innerHTML);

for (let i = 0; i < dobozok.length; i++) {
    let boxRect = dobozok[i].getBoundingClientRect();
    if(((klikkX - 5 > boxRect.left) && (klikkX - 5 < boxRect.left + 60)) && ((klikkY - 5 > boxRect.top) && (klikkY - 5 < boxRect.top + 60))) {

        if (kor < 18) {

            if (kor % 2 == 0) {
                console.log(dobozok[i].firstChild)

                if (dobozok[i].firstChild == null) {

                    dobozok[i].innerHTML = `<img src="./img/fkorong.png"/>`
                    kor++
                    bPieces--
                    document.getElementById('turn').innerHTML = `${document.getElementById('p2name').innerHTML}`

                }else{
                    alert("Tedd máshova!")         
                }
                
            }
            else if(dobozok[i].firstChild == null)
            {

                dobozok[i].innerHTML = `<img src="./img/feherkorong.png"/>`
                kor++
                wPieces-- 
                document.getElementById('turn').innerHTML = `${document.getElementById('p1name').innerHTML}`

            } else{
                alert("Tedd máshova!")
            }
        }else{
            alert("Lépések!")
            //mozgatas
        }
        
    }
    }
}

function restart() {
    for (let i = 0; i < dobozok.length; i++) {  
        dobozok[i].innerHTML = ``
    }
    alert("Újrakezdtétek!")
    location.reload()
    console.log(wPieces);
}

document.getElementById("myButton").onclick = function () {
    location.href = 'jatekszabaly.html'
};