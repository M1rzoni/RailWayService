const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const artikli = [
    { sifra: "H120032", naziv: "Cokolada 320g", cijena: "30", jm: "kom" },
    { sifra: "H109932", naziv: "Mlijeko 3.2", cijena: "1.20", jm: "kom" }
];

app.get("/", (req,res) =>{
   res.json({message: "hello"})
})


app.post('/', (req, res) => {
    const { PJ, SIFRA_ARTIKLA } = req.body;

    if (!PJ || !SIFRA_ARTIKLA) {
        return res.status(400).json({ error: "Fali" });
    }

    const artikal = artikli.find(a => a.sifra === SIFRA_ARTIKLA);

    if (!artikal) {
        return res.status(404).json({ error: "Nema artikla" });
    }

    return res.json({
        pj: PJ,
        sifra: artikal.sifra,
        naziv: artikal.naziv,
        cijena_mpc: artikal.cijena,
        jedinica_mjere: artikal.jm
    });
});

const PORT = 5000;

app.listen(PORT, "0.0.0.0",() => console.log(`API radi na portu ${PORT}`));
