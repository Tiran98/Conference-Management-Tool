const express = require('express')
require('dotenv').config()

const app = express();

app.get('/home', (req,res) => {
    res.send('Hello World !')
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));