const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/constants', require('./routes/api/constants'));
app.use('/api/companies', require('./routes/api/companies'));
app.use('/api/brokers', require('./routes/api/brokers'));
app.use('/api/reinsurers', require('./routes/api/reinsurers'));
app.use('/api/entities', require('./routes/api/entities'));
app.use('/api/activityTypes', require('./routes/api/activityTypes'));
app.use('/api/opportunities', require('./routes/api/opportunities'));
app.use('/api/leads', require('./routes/api/leads'));
app.use('/api/contracts', require('./routes/api/contracts'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
