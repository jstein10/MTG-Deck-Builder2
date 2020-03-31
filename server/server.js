const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors(), express.json(), express.urlencoded({extended:true}));


require('./config/mongoose.config')
require('./routes/mtg.routes')(app);

app.listen(port, ()=> console.log(`Server running... at ${port}!!!`));