import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { db } from './db/database.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// db.getConnection().then((connection) => console.log(connection));
const server = app.listen(config.host.port);
initSocket(server);

// 솔루션 전 직접 짠 코드 (라우터 사용X)
// let tweets = [
//   {
//     id: 1,
//     text: '드림코딩에서 강의 들으면 너무 좋으다',
//     createdAt: '2021-05-09T04:20:57.000Z',
//     name: 'Bob',
//     username: 'bob',
//     url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
//   },
//   {
//     id: 2,
//     text: '드림코딩에서 강의 들으면 너무 좋으시다',
//     createdAt: '2021-05-11T04:20:57.000Z',
//     name: 'Jo',
//     username: 'jo',
//     url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
//   },
// ];

// app.get('/tweets', (req, res, next) => {
//   const username = req.query.username;

//   if (username)
//     res.status(200).send(tweets.filter((tweet) => tweet.username === username));
//   else res.status(200).send(tweets);
// });

// app.get('/tweets/:id', (req, res, next) => {
//   const tweetId = req.params.id;

//   res.status(200).send(tweets.filter((tweet) => tweet.id == tweetId));
// });

// app.post('/tweets', (req, res, next) => {
//   const tweet = {
//     id: Date.now(),
//     text: req.body.text,
//     createdAt: new Date(),
//     name: req.body.name,
//     username: req.body.username,
//   };

//   tweets.push(tweet);

//   res.status(201).send(tweets);
// });

// app.put('/tweets/:id', (req, res, next) => {
//   const tweetId = req.params.id;

//   const tweet = tweets.find((tweet) => tweet.id == tweetId);

//   if (!tweet) res.status(404).send('tweet not found!');

//   tweet.text = req.body.text;

//   res.status(200).send(tweet);
// });

// app.delete('/tweets/:id', (req, res, next) => {
//   const tweetId = req.params.id;

//   tweets = tweets.filter((tweet) => tweet.id != tweetId);

//   res.status(200).send(tweets);
// });
