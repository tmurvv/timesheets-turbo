import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

interface User {
    id: string;
    username: string;
    password: string;
}

const users: User[] = [];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        const user = users.find(u => u.username === username);

        if (user && user.password === password) {
            done(null, user);
        } else {
            done(null, false);
        }
    }
));

passport.serializeUser((user: User, done) => {
    done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

export default passport;