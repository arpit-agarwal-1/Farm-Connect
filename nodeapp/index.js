const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const feedRoutes = require('./routers/feedRouter');
const liveStockRoutes = require('./routers/liveStockRouter');
const requestRoutes = require('./routers/requestRouter');
const userRoutes = require('./routers/userRouter');
const { validateToken } = require('./authUtils');

const PORT = 8080;
const app = express();

app.disable('x-powered-by');

app.use(cors({
    origin:[
        'http://localhost:4200',
        'https://8081-ddeaebceafcdfdebabacbaddafbdafabaec.premiumproject.examly.io',
        'https://8081-becddedcfeebacfcdfdebabacbaddafbdafabaec.premiumproject.examly.io',
        'https://8081-dddfbaeadefecfcfefcdfdebabacbaddafbdafabaec.premiumproject.examly.io',
        'https://8081-bdcfbbfabbeafcdfdebabacbaddafbdafabaec.premiumproject.examly.io',
        'https://8081-ffeaafbecfcdaafcdfdebabacbaddafbdafabaec.premiumproject.examly.io'
    ],
    methods:['GET','POST','PUT','DELETE','PATCH']
}));

app.use(express.json({ limit: '10mb' }));
app.use('/feed', validateToken, feedRoutes);
app.use('/livestock', validateToken, liveStockRoutes);
app.use('/request', validateToken, requestRoutes);
app.use('/user', userRoutes);

mongoose.connect('mongodb://localhost:27017/FarmConnect')
    .then(() => console.log("MongoDB connected."))
    .catch((error) => console.error(error));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})