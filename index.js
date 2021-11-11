const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.render('index.ejs')
});

var books = [];

app.get('/books', (req, res) => {
    res.status(200).send(books)
})

app.post('/books/new', (req, res) => {
    const book = {
        '_id': Math.random().toString(16).substring(2),
        ...req.body
    }
    books.push(book);
    res.send(books);
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    books = books.filter((book) => {
        return book._id !== id;
    });
    res.status(200).send();
});
app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    books.every((book, index) => {
        if (book._id == id) {
            books[index] = {
                '_id': id,
                ...req.body
            }
            return false;
        }
        return true;
    })
    res.status(200).send();
});
http.createServer(app).listen(3400, () => {
    console.log('server started');
})
