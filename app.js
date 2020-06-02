require('dotenv').config();

const { env: { PORT = 8080, MONGO_URL } } = process;
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const app = express();

        app.use('/graphql', graphqlHTTP({
            schema,
            graphiql: true
        }));

        app.listen(PORT, () => console.log(`server running and listening to port ${PORT}`));
    })
