import express from 'express';
import { addStudent, getStudents, deleteStudent,getLastId } from './db.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));



app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.json());

app.post('/main', (req, res) => {
    const { name, surname, patronymic, date, group } = req.body;
    addStudent(name, surname, patronymic, date, group).then(() => {
        console.log('success');
        getLastId().then((rows) => {
            res.send(rows);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

app.get('/main-students', (req, res) => {
    getStudents().then((rows) => {
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    });
});

app.delete('/main-students-delete', (req, res) => {
    const id = req.body.id;
    deleteStudent(id);
    res.send({ status: 'ok' });
});

// Для выполнения задания выбери любую реляционную базу данных (oracle, sql server, mysql, postgresql, sqlite и т.д.).
// 1. Заведи в БД таблицу данных о студентах, которая будет содержать: имя, фамилия, отчество, дата рождения, группа, уникальный номер.
// 2. Создай веб-приложение (клиентскую и серверную части), с помощью которого можно добавить студента, удалить студента по уникальному номеру, вывести список студентов.
// ☝ При работе с БД используй ручное написание запросов, а не ORM. Примени технологию REST API.
// ☝ При выполнении задания можно использовать фреймворки. В этом случае на собеседовании мы попросим тебя объяснить, как работает фреймворк в части выполнения поставленной задачи.
