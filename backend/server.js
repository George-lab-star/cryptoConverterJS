const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'frontend')));
app.use("/backend", express.static(path.join(__dirname, "backend")));

app.get("/", (req, res) => {
    debugger;
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
