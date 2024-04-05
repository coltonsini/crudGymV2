const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://estjuanjordonez:2gH3DtvCEDQJDyPN@gymdatabase.upwmysx.mongodb.net/', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('No se pudo conectar a MongoDB', err));

// Definir el esquema y modelo de usuario
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const tipSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    imagen: String,
})

const User = mongoose.model('User', userSchema);

const Consejo = mongoose.model('Consejo', tipSchema);

// Middleware para parsear JSON en las solicitudes POST
app.use(express.json());

// Rutas

app.get('/', async (req, res) => {
    res.send('Hello World!')
});


app.get('/api/models', async (req, res) => {
    try {
        const models = await User.find();
        res.send(models);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/api/consejos', async (req, res) => {
    try {
        const consejos = await Consejo.find();
        res.send(consejos);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
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
        const { titulo, descripcion, imagen } = req.body;
        const newConsejo = new Consejo({
            titulo,
            descripcion,
            imagen
        });
        const savedConsejo = await newConsejo.save();
        res.status(201).send(savedConsejo);
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Node.js corriendo en el puerto ${PORT}`);
});

// const Consejo1 = new Consejo({
//     titulo: 'Tip 1',
//     descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit arcu nulla accumsan et, nostra mollis venenatis dis tempor pellentesque primis ante vestibulum ultrices dui, consequat commodo magnis condimentum pharetra habitant lectus facilisis nec auctor. Class turpis ante magnis scelerisque risus sagittis, posuere aliquam praesent auctor convallis pellentesque fusce, quisque viverra eget ac vivamus. Magna sed ultrices consequat per facilisi aenean mauris eu turpis, ridiculus interdum cursus duis vivamus condimentum ullamcorper lacus venenatis nam, velit fusce blandit platea lacinia volutpat in hac.',
//     imagen: '123456'
// });

// Consejo1.save()
// .then(() => console.log('Usuario guardado'))
// .catch(err => console.error('Error al guardar el usuario', err));

// const Consejo2 = new Consejo({
//     titulo: 'Tip 2',
//     descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit arcu nulla accumsan et, nostra mollis venenatis dis tempor pellentesque primis ante vestibulum ultrices dui, consequat commodo magnis condimentum pharetra habitant lectus facilisis nec auctor. Class turpis ante magnis scelerisque risus sagittis, posuere aliquam praesent auctor convallis pellentesque fusce, quisque viverra eget ac vivamus. Magna sed ultrices consequat per facilisi aenean mauris eu turpis, ridiculus interdum cursus duis vivamus condimentum ullamcorper lacus venenatis nam, velit fusce blandit platea lacinia volutpat in hac.',
//     imagen: '123456'
// });

// Consejo2.save()
// .then(() => console.log('Usuario guardado'))
// .catch(err => console.error('Error al guardar el usuario', err));

// const Consejo3 = new Consejo({
//     titulo: 'Tip 3',
//     descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit arcu nulla accumsan et, nostra mollis venenatis dis tempor pellentesque primis ante vestibulum ultrices dui, consequat commodo magnis condimentum pharetra habitant lectus facilisis nec auctor. Class turpis ante magnis scelerisque risus sagittis, posuere aliquam praesent auctor convallis pellentesque fusce, quisque viverra eget ac vivamus. Magna sed ultrices consequat per facilisi aenean mauris eu turpis, ridiculus interdum cursus duis vivamus condimentum ullamcorper lacus venenatis nam, velit fusce blandit platea lacinia volutpat in hac.',
//     imagen: '123456'
// });

// Consejo3.save()
// .then(() => console.log('Usuario guardado'))
// .catch(err => console.error('Error al guardar el usuario', err));
