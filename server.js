const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 3000;

const uri = 'mongodb+srv://0322103737:gerardo123@cluster0.zhgsgle.mongodb.net/';
const dbName = 'H2O_Sentinel';
const collectionName = 'v5';

// Habilita CORS para todas las solicitudes
app.use(cors());

async function main() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Conectado a la base de datos');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Define el ObjectId que deseas buscar
        const specificId = '66aeda128f66c39cb91169dd';

        app.get('/v5', async (req, res) => {
            try {
                const document = await collection.findOne({ _id: new ObjectId(specificId) });
                if (document) {
                    res.json(document);
                } else {
                    res.status(404).send('Documento no encontrado');
                }
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err);
    }
}

main().catch(console.error);
