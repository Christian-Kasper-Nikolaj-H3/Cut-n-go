import Express from 'express';

const app = Express();

app.get('/', (req, res) => {
    res.end();
});

app.listen(3000, (err) => console.log('Server is running on port 3000'));