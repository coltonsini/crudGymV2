const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

mongoose.connect('mongodb+srv://estjuanjordonez:2gH3DtvCEDQJDyPN@gymdatabase.upwmysx.mongodb.net/', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('No se pudo conectar a MongoDB', err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const consejoSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
})

const User = mongoose.model('User', userSchema);

const Consejo = mongoose.model('Consejo', consejoSchema);

// Middleware para parsear JSON en las solicitudes POST
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Rutas

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && user.password === password) {
            res.send({ message: 'Inicio de sesión exitoso', redirect: '/consejos' });
        } else {
            res.status(401).send({ message: 'Correo electrónico o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
});


// Ruta para la página después del inicio de sesión
app.get('/consejos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'consejos.html'));
});

app.get('/crearConsejo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'crearConsejos.html'));
});

app.get('/api/consejos', async (req, res) => {
    try {
        const consejos = await Consejo.find();
        res.send(consejos);
    } catch (error) {
        console.error('Error al obtener los consejos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/api/models', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({
            name,
            email,
            password
        });
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/api/consejos', async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const newConsejo = new Consejo({
            titulo,
            descripcion,
        });
        const savedConsejo = await newConsejo.save();
        res.redirect('/consejos');
    } catch (error) {
        console.error('Error al guardar el consejo:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para actualizar un consejo
app.put('/api/consejos/:id', async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const updatedConsejo = await Consejo.findByIdAndUpdate(req.params.id, { titulo, descripcion }, { new: true });
        res.send(updatedConsejo);
    } catch (error) {
        console.error('Error al actualizar el consejo:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para eliminar un consejo
app.delete('/api/consejos/:id', async (req, res) => {
    try {
        await Consejo.findByIdAndRemove(req.params.id);
        res.send({ message: 'Consejo eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el consejo:', error);
        res.status(500).send('Error interno del servidor');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor Node.js corriendo en el puerto ${PORT}`);
});