import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

const app = express();
const PORT = 3000;
// Логування часу
// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   // console.log(req);

//   next();
// });
app.use(express.json());
app.use(cors());

app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

// Перший маршрут
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Okay, bro!' });
});

app.post('/users', (req, res) => {
  console.log('body: ', req.body); // тепер тіло доступне як JS-об’єкт
  res.status(201).json({ message: 'User created' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Okay, bro!',
  });
});

app.get('/users/:userId', (req, res) => {
  // const { userId } = req.params;
  const userId = Number(req.params.userId);
  res.status(200).json({ id: userId, name: 'Jacob' });
});
