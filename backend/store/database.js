const mysql = require('mysql');

const executeTransaction = (functions) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    connection.beginTransaction((err) => {
        if (err) {
            throw err;
        }

        const executeNextFunction = (index, results) => {
            if (index === functions.length) {
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            throw err;
                        });
                    }
                    connection.end();
                });
            } else {
                const func = functions[index];
                const values = results ? results : [];
                func(connection, ...values).then((res) => {
                    const allResults = [...values, res];
                    executeNextFunction(index + 1, allResults);
                }).catch((err) => {
                    return connection.rollback(() => {
                        throw err;
                    });
                });
            }
        };

        executeNextFunction(0, []);
    });
};

module.exports = executeTransaction;