const mongoose = require('mongoose');
const database = 'mtg'

mongoose.connect(`mongodb://localhost/${database}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=> console.log(`Established a connection to MongoDB: ${database}!`))
.catch(err=>console.log(`Connection to MongoDB: ${database} failed, something went wrong...`, err))