import chalk from 'chalk';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const signin = (req, res) => {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    console.log(chalk.green('Connected to PlanetScale MySQL Database !!'));

    const body = req.body;
    console.log(body);

    const sentEmail = body.email;
    const sentPassword = body.password;

    const sql = `SELECT * FROM users WHERE email = '${sentEmail}';`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error 500 : Internal Server Error');

            connection.end();
            console.log(chalk.yellowBright('Disconnected from PlanetScale MySQL Database !!'));
            
        } else {
            console.log(result);

            if (result.length === 0) {
                res.status(401).send('Error 401 : Unauthorized');

            } else {
                const dbUid = result[0].uid;
                const dbName = result[0].name;
                const dbEmail = result[0].email;
                const dbPassword = result[0].password;

                if (sentEmail === dbEmail && sentPassword === dbPassword) {
                    res.redirect('/home.html');
                } else {
                    res.status(401).send('Error 401 : Unauthorized');
                }
            }

            connection.end();
            console.log(chalk.yellowBright('Disconnected from PlanetScale MySQL Database !!'));
        }
    });
}

export default signin;