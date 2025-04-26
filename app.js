const express = require('express');
const dotenv = require('dotenv');
const personRoutes = require('./routes/personRoutes');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use('/api/persons', personRoutes);

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 