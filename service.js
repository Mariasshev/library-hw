var express  = require('express'); 
var app = express(); 

var port = 8080; 
var mssql = require('mssql'); 
// параметры соединения с бд
var config = {
    server: 'LAPTOP-RPD6D51R\\SQLEXPRESS01',
    database: 'Library',
    user: 'Maria',
    password: '12345',
    options: {
      encrypt: true,  // Использование SSL/TLS
      trustServerCertificate: true // Отключение проверки самоподписанного сертификата
    },
    port: 1433
  }

  mssql.connect(config, err => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } else {
        console.log('Успешное подключение к базе данных');
    }
});


app.get('/books', (req, res) => {
    const request = new mssql.Request(); 

    request.query('SELECT * FROM Books', (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Произошла ошибка при получении данных');
        } else {
            res.json(result.recordset); 
        }
    });
});

app.get('/books/:paramAuth', (req, res) => {  
    const paramAuth = req.params.paramAuth; 

    const request = new mssql.Request(); 

    request.input('paramAuth', mssql.VarChar, paramAuth);

    request.query('SELECT * FROM Books JOIN Authors ON Books.id = Authors.id WHERE Authors.LastName = @paramAuth', (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Произошла ошибка при получении данных');
        } else {
            res.json(result.recordset);  
        }
    });
});


app.get('/departments/:paramName', (req, res) => {  
    const paramName = req.params.paramName; 

    const request = new mssql.Request(); 

    request.input('paramName', mssql.VarChar, paramName);

    request.query('SELECT * FROM Books JOIN Departments ON Books.id = Departments.id WHERE Departments.Name = @paramName', (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Произошла ошибка при получении данных');
        } else {
            res.json(result.recordset);  
        }
    });
});

app.get('/students', (req, res) => {
    const request = new mssql.Request(); 

    request.query('SELECT * FROM Students', (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Произошла ошибка при получении данных');
        } else {
            res.json(result.recordset); 
        }
    });
});

app.get('/groups/:paramGroup', (req, res) => {  
    const paramGroup = req.params.paramGroup; 

    const request = new mssql.Request(); 

    request.input('paramGroup', mssql.VarChar, paramGroup);

    request.query('SELECT * FROM Students JOIN Groups ON Students.Id_Group = Groups.Id WHERE Groups.Name = @paramGroup', (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Произошла ошибка при получении данных');
        } else {
            res.json(result.recordset);  
        }
    });
});

app.get('/faculties', (req, res) => {
    const request = new mssql.Request(); 

    request.query('SELECT * FROM Faculties', (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Произошла ошибка при получении данных');
        } else {
            res.json(result.recordset); 
        }
    });
});

app.get('/teachers', (req, res) => {
    const request = new mssql.Request(); 

    request.query('SELECT * FROM Teachers', (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Произошла ошибка при получении данных');
        } else {
            res.json(result.recordset); 
        }
    });
});



app.listen(port, function() { 
	console.log('app listening on port ' + port); 
}); 