const Person = require('../models/Person');

// Créer une personne
exports.createPerson = async (req, res) => {
    try {
        const person = new Person(req.body);
        await person.save();
        res.status(201).json(person);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Créer plusieurs personnes
exports.createManyPeople = async (req, res) => {
    try {
        const people = await Person.create(req.body);
        res.status(201).json(people);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Trouver toutes les personnes par nom
exports.findPeopleByName = async (req, res) => {
    try {
        const people = await Person.find({ name: req.params.name });
        res.json(people);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Trouver une personne par aliment favori
exports.findOneByFood = async (req, res) => {
    try {
        const person = await Person.findOne({ favoriteFoods: req.params.food });
        res.json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Trouver une personne par ID
exports.findPersonById = async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Personne non trouvée' });
        }
        res.json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une personne
exports.updatePerson = async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Personne non trouvée' });
        }
        person.favoriteFoods.push('hamburger');
        await person.save();
        res.json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour l'âge d'une personne
exports.updateAge = async (req, res) => {
    try {
        const person = await Person.findOneAndUpdate(
            { name: req.params.name },
            { age: 20 },
            { new: true }
        );
        if (!person) {
            return res.status(404).json({ message: 'Personne non trouvée' });
        }
        res.json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une personne
exports.deletePerson = async (req, res) => {
    try {
        const person = await Person.findByIdAndRemove(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Personne non trouvée' });
        }
        res.json({ message: 'Personne supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer toutes les personnes nommées Mary
exports.deleteMarys = async (req, res) => {
    try {
        const result = await Person.deleteMany({ name: 'Mary' });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Recherche avancée
exports.chainSearch = async (req, res) => {
    try {
        const people = await Person.find({ favoriteFoods: 'burritos' })
            .sort('name')
            .limit(2)
            .select('-age')
            .exec();
        res.json(people);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 