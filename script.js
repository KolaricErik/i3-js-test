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


let brojPitanja
let brojTocnih = 0
let svaPitanja = []
let sviOdgovori = []
let maxTocnih = 0 
let klik = 0
let maxKlikova = 0
let poljePitanja =[]

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
    if(brojPitanja == 0) {
        prijasnje.classList.add("hide")
    }
    if(brojPitanja >= 1) {
        rezultati.classList.add("hide")
        sljedece.classList.remove("hide")
    }
    reset()
    let pitanje = svaPitanja[brojPitanja]
    trenutnoPitanje.innerHTML = pitanje
    let odgovori = sviOdgovori[brojPitanja]
    brojPitanja++

    odgovori.forEach(odgovorOdabran => {
        if(odgovorOdabran.tocno == true) {
            const gumb = document.createElement('button')
            gumb.innerText = odgovorOdabran.odgovor
            gumb.classList.add('odg')
            gumb.classList.add('tocno')
            gumboviOdgovori.appendChild(gumb)
            gumb.addEventListener("click", function() {
                gumb.classList.add("zeleno")
            })


        } else {
            const gumb = document.createElement('button')
            gumb.innerText = odgovorOdabran.odgovor
            gumb.classList.add('odg')
            gumboviOdgovori.appendChild(gumb)
            gumb.addEventListener("click", function() {
                gumb.classList.add("crveno")
            })
        }
        
    
    })

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
    dobrodosli.classList.add("hide")
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
        sljedece.classList.remove("hide")
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
    svaPitanja.push(pitanjeOdabrano.pitanje)
    sviOdgovori.push(ukupnoOdgovora)
    maxTocnih = 0
    klik = 0
    maxKlikova = 2 + brojPitanja+1
    let ukupnoKlikova = 0
    if(svaPitanja[brojPitanja+1] == null) {
        ukupnoOdgovora.forEach(odgovorOdabran => {
            const gumb = document.createElement('button')
            gumb.innerText = odgovorOdabran.odgovor
            gumb.classList.add('odg')
            if(odgovorOdabran.tocno == true) {
                gumb.classList.add("tocno")
                maxTocnih++
            }
            
            gumb.addEventListener("click", function() {
                if (odgovorOdabran.tocno == true) {
                    gumb.setAttribute("class", "odg zeleno")
                    if(odgovorOdabran.tocno == true) {
                        gumb.classList.add("tocno")
                        klik++
                    }
                    if(maxTocnih == klik) {
                        if(brojPitanja == 1) {
                            let br = document.getElementById("jedan")
                            br.setAttribute("class", "br zeleno")
                            brojTocnih++
                        } else if(brojPitanja == 2) {
                            let br = document.getElementById("dva")
                            br.setAttribute("class", "br zeleno")
                            brojTocnih++
                        } else if(brojPitanja == 3) {
                            let br = document.getElementById("tri")
                            br.setAttribute("class", "br zeleno")
                            brojTocnih++
                        } else {
                            let br = document.getElementById("cetiri")
                            br.setAttribute("class", "br zeleno")
                            brojTocnih++
                        }
                    }
                } else {
                    gumb.setAttribute("class", "odg crveno")
                }
                ukupnoKlikova++                
                if(ukupnoKlikova >= maxKlikova) {
                    window.alert("Izabrali ste maksimalni broj odgovra na ovom pitanju!")
                    if(brojPitanja == 4) {
                        prikaziRezultat()
                    } else {
                        postaviPitanje()

                    }
                    /*gumb.removeEventListener("click", function(){
                        gumb.classList.add("hide")
                    })*/
                }

            }, {once : true});
        
            gumboviOdgovori.appendChild(gumb)

        })
    } else {
        sviOdgovori[brojPitanja].forEach(odgovorOdabran => {
            const gumb = document.createElement('button')
            gumb.innerText = odgovorOdabran.odgovor
            gumb.classList.add('odg')
            if(odgovorOdabran.tocno == true) {
                gumb.classList.add("tocno")
                maxTocnih++
            }

            gumb.addEventListener("click", function() {
                if (odgovorOdabran.tocno == true ) {
                    gumb.setAttribute("class", "odg zeleno")
                    if(klik == maxTocnih) {
                        if(brojPitanja == 0) {
                            let br = document.getElementById("jedan")
                            br.setAttribute("class", "br zeleno")
                        } else if(brojPitanja == 1) {
                            let br = document.getElementById("dva")
                            br.setAttribute("class", "br zeleno")
                        }
                    }
                    brojTocnih++

                } else {
                    gumb.setAttribute("class", "odg crveno")
            }
            }, {once : true});
            gumboviOdgovori.appendChild(gumb)
       
        })
    }


    
}



function prikaziRezultat() {
    let lokacija = document.getElementById("uspjeh")
    lokacija.classList.remove("hide")
    odabranoPitanje.classList.add("hide")
    let div = document.createElement("div")
    div.classList.add("zavrsen")
    lokacija.appendChild(div)
    let naslov = document.createElement("h1")
    let uspjeh = document.createElement("h2")
    //let gumb = document.createElement("button")
    div.appendChild(naslov)
    div.appendChild(uspjeh)
    //div.appendChild(gumb)
    //gumb.innerText = "Ponovno pokreni kviz"
    //gumb.setAttribute("onclick", "pokreniKviz()")
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