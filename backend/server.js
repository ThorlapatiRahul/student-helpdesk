require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
console.log('=== ENV DEBUG ===');
console.log('OPENAI_API_KEY length =', (process.env.OPENAI_API_KEY || '').length);
console.log('JWT_SECRET length =', (process.env.JWT_SECRET || '').length);
console.log('VITE_API_BASE =', process.env.VITE_API_BASE);
console.log('====================');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const faqRoutes = require('./routes/faq');
const queryRoutes = require('./routes/query');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/chat', chatRoutes);

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
