import express from 'express';
import myrouter from './routes/product.js';

const PORT = 5000;
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.send("ok running!");
});

app.use('/api', myrouter);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING PORT ${PORT}`);
});