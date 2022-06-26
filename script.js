const dobrodosli = document.getElementById('dobrodosli');
const odabranoPitanje = document.getElementById('odabranoPitanje');
const trenutnoPitanje = document.getElementById('trenutnoPitanje');
const gumboviOdgovori = document.getElementById('odgovori')
const sljedece = document.getElementById('sljedece')
const prijasnje = document.getElementById('prijasnje')
const rezultati = document.getElementById('rezultati')
const uspjeh = document.getElementById('uspjeh')
let odgovor = document.getElementsByClassName('odg')


const side = document.getElementsByClassName('broj')


let brojPitanja;
let brojTocnih = 0;


function pokreniKviz() {
    dobrodosli.classList.add('hide')
    uspjeh.classList.add('hide')
    odabranoPitanje.classList.remove('hide')
    brojPitanja = 0;
    postaviPitanje()
}

function vratiSe() {
    brojPitanja--
    brojPitanja--
    reset()
    postaviPitanje()
}

function postaviPitanje() {
    if(brojPitanja < 1) {
        prijasnje.setAttribute("class", "hide")
    } else {
        prijasnje.classList.remove("hide")
    }

    
    reset()
    prikaziPitanje(pitanja[brojPitanja])

    brojPitanja++

    if(brojPitanja >= pitanja.length) {
        sljedece.setAttribute("class", "hide")
        rezultati.classList.remove("hide")
    }
    if(brojPitanja == pitanja.length-1) {
        sljedece.classList.remove("hide")
        rezultati.classList.add("hide")
    }

}

function reset() {
    izbrisiPitanje(document.body)
    while (gumboviOdgovori.firstChild) {
      gumboviOdgovori.removeChild(gumboviOdgovori.firstChild)
    }
}

function izbrisiPitanje(element) {
    element.classList.remove('odgovori')
}



function prebaci(i) {
    uspjeh.classList.add("hide")
    odabranoPitanje.classList.remove("hide")
    reset()    
    brojPitanja = i
    if(i == 3) {
        sljedece.classList.add("hide")
        rezultati.classList.remove("hide")
        prijasnje.classList.remove("hide")
    } else if(i > 0) {
        prijasnje.classList.remove("hide")
        sljedece.classList.remove("hide")
        rezultati.classList.add("hide")
    } else if(i == 0) {
        prijasnje.classList.add("hide")
        rezultati.classList.add("hide")
    }
    prikaziPitanje(pitanja[i])
    brojPitanja++
}
  

function prikaziPitanje(pitanjeOdabrano) {
    trenutnoPitanje.innerText = pitanjeOdabrano.pitanje
    let brojOdgovora = [2, 3, 4, 5, 6, 7, 8]
    let randomBroj = brojOdgovora[Math.floor(Math.random() * 7)]
    let ukupnoOdgovora = pitanjeOdabrano.odgovori.slice(0, randomBroj)
    
    ukupnoOdgovora.forEach(odgovorOdabran => {
        const gumb = document.createElement('button')
        gumb.innerText = odgovorOdabran.odgovor
        gumb.classList.add('odg')
        gumb.addEventListener("click", function() {
            if (odgovorOdabran.tocno == true) {
                gumb.setAttribute("class", "odg zeleno")
                if(brojPitanja == 1) {
                    let br = document.getElementById("jedan")
                    br.setAttribute("class", "br zeleno")
                } else if(brojPitanja == 2) {
                    let br = document.getElementById("dva")
                    br.setAttribute("class", "br zeleno")

                } else if(brojPitanja == 3) {
                    let br = document.getElementById("tri")
                    br.setAttribute("class", "br zeleno")
                } else {
                    let br = document.getElementById("cetiri")
                    br.setAttribute("class", "br zeleno")
                }
                brojTocnih++
            } else {
                gumb.setAttribute("class", "odg crveno")
                if(brojPitanja == 1) {
                    let br = document.getElementById("jedan")
                    br.setAttribute("class", "br crveno")
                } else if(brojPitanja == 2) {
                    let br = document.getElementById("dva")
                    br.setAttribute("class", "br crveno")
                } else if(brojPitanja == 3) {
                    let br = document.getElementById("tri")
                    br.setAttribute("class", "br crveno")
                } else {
                    let br = document.getElementById("cetiri")
                    br.setAttribute("class", "br crveno")
                }
            }

        }, {once : true});
        
        gumboviOdgovori.appendChild(gumb)

    })
}



function prikaziRezultat() {
    let lokacija = document.getElementById("uspjeh")
    lokacija.classList.remove("hide")
    odabranoPitanje.classList.add("hide")
    let div = document.createElement("div")
    lokacija.appendChild(div)
    let naslov = document.createElement("h1")
    let uspjeh = document.createElement("h2")
    let gumb = document.createElement("button")
    div.appendChild(naslov)
    div.appendChild(uspjeh)
    div.appendChild(gumb)
    gumb.innerText = "Ponovno pokreni kviz"
    gumb.setAttribute("onclick", "pokreniKviz()")
    naslov.innerHTML = "Kviz je završen!"
    uspjeh.innerHTML = "Broj točnih odgovora: " + brojTocnih + "/4"
}


const pitanja = [
    {
      pitanje: "Koje je pitanje broj jedan?",
      odgovori: [
        { odgovor: '1.', tocno: false },
        { odgovor: '2.', tocno: true },
        { odgovor: '3.', tocno: false },
        { odgovor: '4.', tocno: true },
        { odgovor: '5.', tocno: false },
        { odgovor: '6.', tocno: false },
        { odgovor: '7.', tocno: true },
        { odgovor: '8.', tocno: false }
      ]
    },
    {
        pitanje: "Koje je pitanje broj dva?",
        odgovori: [
            { odgovor: '1.', tocno: false },
            { odgovor: '2.', tocno: true },
            { odgovor: '3.', tocno: false },
            { odgovor: '4.', tocno: false },
            { odgovor: '5.', tocno: true },
            { odgovor: '6.', tocno: false },
            { odgovor: '7.', tocno: true },
            { odgovor: '8.', tocno: false }
        ]
      },
      {
        pitanje: "Koje je pitanje broj tri?",
        odgovori: [
            { odgovor: '1.', tocno: true },
            { odgovor: '2.', tocno: false },
            { odgovor: '3.', tocno: false },
            { odgovor: '4.', tocno: false },
            { odgovor: '5.', tocno: false },
            { odgovor: '6.', tocno: false },
            { odgovor: '7.', tocno: true },
            { odgovor: '8.', tocno: false }
        ]
      },
      {
        pitanje: "Koje je pitanje broj četiri?",
        odgovori: [
            { odgovor: '1.', tocno: false },
            { odgovor: '2.', tocno: false },
            { odgovor: '3.', tocno: true },
            { odgovor: '4.', tocno: false },
            { odgovor: '5.', tocno: false },
            { odgovor: '6.', tocno: false },
            { odgovor: '7.', tocno: false },
            { odgovor: '8.', tocno: true }
        ]
      }
]