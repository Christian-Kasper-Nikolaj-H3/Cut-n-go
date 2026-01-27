import Express from 'express';

const app = Express();

app.use(Express.static('public'));
app.use(Express.json());
app.set('view engine', 'ejs');

app.use("/admin", (req, res) => {
   res.render('admin');
   res.end();
});

app.use("/book", (req, res) => {
    res.render('book');
    res.end();
});

app.listen(3000, (err) => console.log('Server is running on port 3000'));