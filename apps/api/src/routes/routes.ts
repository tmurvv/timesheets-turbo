import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        res.send('Logged in');
    }
);

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

    res.send('Logged out');
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // users.push({
    //     id: users.length + 1 + '',
    //     username,
    //     password
    // });
    console.log("from signup: ", username, password);
    res.send('NYI Signed up');
});

export default router;
