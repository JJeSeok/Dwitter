import MongoDb from 'mongodb';
import { getTweets } from '../db/database.js';
import * as userRepository from './auth.js';
const ObjectId = MongoDb.ObjectId;

// NOSQL (정보의 중복 > 관계)
// 모든 사용자가 트윗을 쿼리하는 횟수 > 사용자가 사용자의 정보를 업데이트 횟수
// 프로필 DB
// 사용자의 문서 DB: 서버1, 서버2, 서버3
// 관계형 조인쿼리의 성능이 좋지 않다.

// SQL: 관계형
// 조인쿼리의 성능이 좋기때문에

export async function getAll() {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(tweetId) {
  return getTweets()
    .findOne({ _id: new ObjectId(tweetId) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { username, name, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    username,
    name,
    url,
    userId,
  };

  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, id: data.insertedId }));
}

export async function update(tweetId, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(tweetId) },
      { $set: { text } },
      { returnDocument: 'after' }
    )
    .then(mapOptionalTweet);
}

export async function remove(tweetId) {
  return getTweets().deleteOne({ _id: new ObjectId(tweetId) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
