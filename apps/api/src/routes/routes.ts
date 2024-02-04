
import { Router } from 'express';
import passport from './passport';

const router = Router();

router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        res.send('Logged in');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.send('Logged out');
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    users.push({
        id: users.length + 1 + '',
        username,
        password
    });
    res.send('Signed up');
});

export default router;
