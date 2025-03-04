const express = require('express');
const  cors = require( "cors");
const { ServerConfig, ConnectDB} = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    await ConnectDB();
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
