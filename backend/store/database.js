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

                    console.log('Transaction committed successfully!');
                    connection.end();
                });
            } else {
                const func = functions[index];
                const values = results ? results : [];
                console.log('====================================');
                console.log(func);
                console.log('====================================');
                func(connection, ...values).then((res) => {
                    const allResults = [...values, res];
                    console.log(`Function ${index + 1} executed successfully!`, allResults);
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