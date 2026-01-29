import Express from 'express';
import apiRoute from './routes/api.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import {requireAuth} from "./middleware/auth.js";
import cookieParser from 'cookie-parser';

const app = Express();

app.use(Express.static('public'));
app.use(Express.urlencoded({extended: true}));
app.use(Express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use('/api', apiRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);

app.use("/admin", (req, res) => {
    res.render('admin');
});

app.use("/book", (req, res) => {
    res.render('book');
});

app.use("/sign-in", (req, res) => {
    res.render('sign-in');
});

app.get("/logout", (req, res) => {
    res.clearCookie("token", { sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    res.redirect("/sign-in");
});

app.use("/dashboard", requireAuth, (req, res) => res.render('dashboard'));
app.use("/register", (req, res) => res.render('register'));

app.listen(3000, (err) => console.log('Server is running on port 3000'));