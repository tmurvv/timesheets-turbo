import express from 'express';
import passport from 'passport';

import {generatePassword} from "../lib/passwordUtils.js";
import connection from "../config/database.js";

import {isAuth, isAdmin} from "./authMiddleware.js";

const router = express.Router();
const User = connection.models.User;

router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }));

router.post('/register', (req, res) => {
  const saltHash = generatePassword(req.body.pw);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.uname,
    hash: hash,
    salt: salt,
    admin: true
  });

  newUser.save()
      .then((user) => {
        console.log(user);
      });

  res.redirect('/login');
});

router.get('/', (req, res) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

router.get('/login', (req, res) => {
  const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

router.get('/register', (req, res) => {
  const form = '<h1>Register Page</h1><form method="post" action="/register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

router.get('/protected-route', isAuth, (req, res) => {
  res.send('You made it to the protected route.');
});

router.get('/admin-route', isAdmin, (req, res) => {
  res.send('You made it to the admin route.');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/protected-route');
});

router.get('/login-success', (req, res) => {
  res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res) => {
  res.send('Your password does not match our records.');
});

export default router;