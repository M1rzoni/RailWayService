const express = require("express");
const app = express();

app.use(express.json());


const artikli = [
    {sifra: "H120032", naziv: "Cokolada 320g", cijena: "30", jm:"kom"},
    {sifra: "H109932", naziv: "Mlijeko 3.2", cijena: "1.20",jm: "kom"}
]

app.post('/artikli', (req,res) =>{
    const {PJ, SIFRA_ARTIKLA} = req.body;

    if(!PJ || !SIFRA_ARTIKLA){
        return res.status(400).json({error: "Fali"});
    }

    const artikli = artikli.find(a => a.sifra === SIFRA_ARTIKLA);

    if(!artikli){
        return res.status(404).json({error: "Nema artikla"})
    }


    return res.json({
        pj: PJ,
        sifra: artikli.sifra,
        naziv: artikli.naziv,
        cijena_mpc: artikli.cijena,
        jedinica_mjere: artikli.jm

    })

})

app.listen(3000, () => console.log("API radi na portu 3000"));