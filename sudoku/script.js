const kezdoTabla = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

const nehézségiSzintek = {
    könnyű: 40,
    közepes: 30,
    nehéz: 20
};

function tablaLetrehozasa(tabla) {
    const nehézség = document.getElementById('nehézség').value;
    const üresMezők = nehézségiSzintek[nehézség];
    const tablaElem = document.getElementById('sudoku-tabla');
    tablaElem.innerHTML = '';
    for (let sor = 0; sor < 9; sor++) {
        for (let oszlop = 0; oszlop < 9; oszlop++) {
            const mezo = document.createElement('input');
            if (tabla[sor][oszlop] !== null) {
                mezo.value = tabla[sor][oszlop];
                mezo.disabled = true;
            }
            mezo.maxLength = 1;
            mezo.oninput = () => {
                mezo.value = mezo.value.replace(/[^1-9]/g, '');
            };
            tablaElem.appendChild(mezo);
        }
    }
}

function ellenoriz() {
    const tablaElem = document.getElementById('sudoku-tabla');
    const mezok = tablaElem.querySelectorAll('input');
    let megoldva = true;

    
    const tabla = Array.from({ length: 9 }, (_, sor) => 
        Array.from({ length: 9 }, (_, oszlop) => 
            parseInt(mezok[sor * 9 + oszlop].value) || null
        )
    );

    for (let sor = 0; sor < 9; sor++) {
        for (let oszlop = 0; oszlop < 9; oszlop++) {
            const mezo = mezok[sor * 9 + oszlop];
            mezo.classList.remove('helyes', 'helytelen');
            if (tabla[sor][oszlop] !== null && ervenyes(tabla, sor, oszlop, tabla[sor][oszlop])) {
                mezo.classList.add('helyes');
            } else {
                if (tabla[sor][oszlop] !== null) {
                    mezo.classList.add('helytelen');
                }
                megoldva = false;
            }
        }
    }

    if (megoldva) {
        alert('Gratulalunk, minden szam helyes!');
    }
}

function ervenyes(tabla, sor, oszlop, szam) {
    for (let x = 0; x < 9; x++) {
        if (x !== oszlop && tabla[sor][x] === szam) {
            return false;
        }
    }

    for (let y = 0; y < 9; y++) {
        if (y !== sor && tabla[y][oszlop] === szam) {
            return false;
        }
    }

    const startSor = Math.floor(sor / 3) * 3;
    const startOszlop = Math.floor(oszlop / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((startSor + i !== sor || startOszlop + j !== oszlop) && tabla[startSor + i][startOszlop + j] === szam) {
                return false;
            }
        }
    }

    return true;
}
tablaLetrehozasa(kezdoTabla);