const express = require("express");
const app = express();
const PORT = 8080;

app.get("/api/home", (req, res) => {
    res.json({message: "Hello World!"});
});

console.log(process.env.test);

app.get("test", (req, res) => {
    res.status(200).send("it works!");
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

