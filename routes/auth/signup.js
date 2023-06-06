import chalk from 'chalk';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const signup = (req, res) => {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    console.log(chalk.green('Connected to PlanetScale MySQL Database !!'));

    const body = req.body;
    console.log(body);
    const name = body.name;
    const email = body.email;
    const password = body.password;
    const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const sql = `INSERT INTO users (uid, name, email, password) VALUES ('${uid}', '${name}', '${email}', '${password}');`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error 500 : Internal Server Error');
            connection.end();
            console.log(chalk.yellowBright('Disconnected from PlanetScale MySQL Database !!'));
        } else {
            console.log(result);
            res.redirect('/signin.html');
            connection.end();
            console.log(chalk.yellowBright('Disconnected from PlanetScale MySQL Database !!'));
        }
    });
};

export default signup;