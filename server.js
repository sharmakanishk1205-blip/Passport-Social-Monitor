const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const translateRouter = require('./routes/translate');
const exportRouter = require('./routes/export');
const statsRouter = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/translate', translateRouter);
app.use('/api/export', exportRouter);
app.use('/api/stats', statsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
