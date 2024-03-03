import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as userRepository from './auth.js';

const tweetShema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetShema);
const Tweet = Mongoose.model('Tweet', tweetShema);

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(tweetId) {
  return Tweet.findById(tweetId);
}

export async function create(text, userId) {
  return userRepository.findById(userId).then((user) =>
    new Tweet({
      text,
      userId,
      name: user.name,
      username: user.username,
    }).save()
  );
}

export async function update(tweetId, text) {
  return Tweet.findByIdAndUpdate(tweetId, { text }, { returnOriginal: false });
}

export async function remove(tweetId) {
  return Tweet.findByIdAndDelete(tweetId);
}
