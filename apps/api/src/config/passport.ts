import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

interface User {
    id: string;
    username: string;
    password: string;
}

const users: User[] = [
    {
        id: "1",
        username: "tisha",
        password: "password"
    }
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        const myUser = users.find(u => u.username === username);

        if (myUser && myUser.password === password) {
            done(null, myUser);
        } else {
            done(null, false);
        }
    }
));

passport.serializeUser((user: Express.User, done) => {
    done(null, user);
});

passport.deserializeUser((id: string, done) => {
    const myUser = users.find(u => u.id === id);
    done(null, myUser);
});

export default passport;