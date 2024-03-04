import { getSocketIO } from '../connection/socket.js';
import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res, next) {
  const tweetId = req.params.id;
  const tweet = await tweetRepository.getById(tweetId);

  if (tweet) res.status(200).json(tweet);
  else res.status(404).json({ message: `Tweet id(${tweetId}) not found` });
}

export async function createTweet(req, res, next) {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);

  res.status(201).json(tweet);
  getSocketIO().emit('tweets', tweet);
}

export async function updateTweet(req, res, next) {
  const tweetId = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.getById(tweetId);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }

  const updated = await tweetRepository.update(tweetId, text);
  res.status(200).json(updated);
}

export async function deleteTweet(req, res, next) {
  const tweetId = req.params.id;
  const tweet = await tweetRepository.getById(tweetId);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }

  await tweetRepository.remove(tweetId);
  res.sendStatus(204);
}
