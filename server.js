const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/constants', require('./routes/api/constants'));
app.use('/api/companies', require('./routes/api/companies'));
app.use('/api/brokers', require('./routes/api/brokers'));
app.use('/api/reinsurers', require('./routes/api/reinsurers'));
app.use('/api/opportunities', require('./routes/api/opportunities'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
