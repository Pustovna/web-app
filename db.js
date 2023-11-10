import sqlite3 from 'sqlite3';
import  path  from 'path';

const dbName = path.resolve('data.db');


export const db = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("Error connecting to the database");
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

db.serialize(() => {
    const sql = `
    CREATE TABLE IF NOT EXISTS messages ( 
        id INTEGER PRIMARY KEY, имя TEXT, фамилия TEXT, отчество TEXT, дата рождения DATE, группа TEXT
    )
 `
    db.run(sql);
});

db.close( (err) => {
    if (err) {
        console.error(err.message);
}});


export const openDB = () => {
    return new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.log("Error connecting to the database");
            console.error(err.message);
        } else {
            console.log('Connected to the database.');
        }
    });
}





export const closeDB = (db) => {
    db.close( (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Close the database connection.');
        }});
}

export const addStudent = (name, surname, patronymic, date, group) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO messages (имя, фамилия, отчество, дата, группа) VALUES ('${name}', '${surname}', '${patronymic}', '${date}', '${group}')`;
        const db = openDB();
        db.run(sql, (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log('Row inserted');
                resolve();
            }
            closeDB(db);
        });
    });
};

export const getStudents = () => {
    const sql = 'SELECT * FROM messages';
    const dbNew = openDB();
    return new Promise((resolve, reject) => {
        dbNew.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            console.log(rows);
            resolve(rows);
            
        });
        closeDB(dbNew);
    });
}

//get last id
export const getLastId = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT *, MAX(id) FROM messages';
        const dbNew = openDB();
        dbNew.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            console.log(rows);
            resolve(rows);
            
        });
        closeDB(dbNew);
    });
}

export const deleteStudent = (id) => {
    const sql = `DELETE FROM messages WHERE id = ${id}`;
    const dbNew = openDB();
    dbNew.run(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) deleted`);
    });
    closeDB(dbNew);
}

