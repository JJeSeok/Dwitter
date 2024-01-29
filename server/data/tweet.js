import * as userRepository from './auth.js';

let tweets = [
  {
    id: '1',
    text: '드림코딩에서 강의 들으면 너무 좋으다',
    createdAt: '2021-05-09T04:20:57.000Z',
    userId: '1',
  },
  {
    id: '2',
    text: '드림코딩에서 강의 들으면 너무 좋으시다',
    createdAt: '2021-05-11T04:20:57.000Z',
    userId: '2',
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(tweetId) {
  const found = tweets.find((tweet) => tweet.id === tweetId);
  if (!found) return null;

  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: (tweets.length + 1).toString(),
    text,
    createdAt: new Date(),
    userId,
  };

  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(tweetId, text) {
  const tweet = tweets.find((tweet) => tweet.id === tweetId);
  if (tweet) tweet.text = text;
  return getById(tweet.id);
}

export async function remove(tweetId) {
  tweets = tweets.filter((tweet) => tweet.id !== tweetId);
}
