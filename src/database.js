const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/crud-jwt', {
      useNewUrlParser:true,
      useUnifiedTopology:true
      
}).then(res=> console.log('connect a mongodb'))

