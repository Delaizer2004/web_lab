const express = require('express');
const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.use(express.static('public')); 

app.get('/', (req, res) => {
    const resumeData = {
        name: "Мамчич Дмитро",
        position: "Веб-розробник",
        about: "Я креативний веб-розробник з досвідом створення сучасних сайтів.",
        skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"],
        experience: {
            company: "Компанія XYZ",
            role: "Full-Stack Developer",
            years: "2021–2023",
            details: "Розробка веб-додатків, створення REST API, інтеграція баз даних."
        },
        education: {
            university: "Черкаський державний технологічний університет",
            specialty: "Інженерія програмного забезпечення",
            years: "2018–2022"
        },
        contact: "Delaizer2004@gmail.com | +380 974 275 246"
    };

    res.render('index', { resume: resumeData });
});

app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
