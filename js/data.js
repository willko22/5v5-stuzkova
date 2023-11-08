const data = [
    {
        "q": "Pred ktorým učiteľom majú žiaci najväčší rešprekt",
        "a": {
            "Mendelová": 22, 
            "Štefulová": 6, 
            "Jurečková": 5, 
            "Brajerová": 4
        }
    },
    {
        "q": "Najčastejšia výhovorka, ked žiak mešká do školy",
        "a": {
            "Meškal mi vlak/autobus": 22, 
            "Zaspal/a som": 7, 
            "Nemešákm": 4, 
            "Bola zápcha": 3
        }
    },
    {
        "q": "Čo majú žiaci najradšej na Einteinovej",
        "a": {
            "Bufet": 15, 
            "Marcelu Gregorcovú": 5, 
            "Flórbalový runaj": 4, 
            "Záchody v prístavku": 3
        }
    },
    {
        "q": "Ktoreho učitela majú žiaci najradšej?",
        "a": {
            "Gregorcová": 8, 
            "Mesároš": 7, 
            "Loffay": 6, 
            "Juriková": 5,
            "Štempelová": 3
        }
    },
    {
        "q": "Čo si najčastejšie študenti kupujú v bufete?",
        "a": {
            "Toast": 20, 
            "Bageta": 7, 
            "Wafle": 3, 
            "žuvačky": 2
        }
    }
]

const sectionsCount = data.length
let currentSection = 0
const maxIncorrect = 3
let currentIncorrect = 0