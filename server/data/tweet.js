import { db } from '../db/database.js';
import * as userRepository from './auth.js';

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);
}

export async function getById(tweetId) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [tweetId])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function update(tweetId, text) {
  return db
    .execute('UPDATE tweets SET text=? WHERE id=?', [text, tweetId])
    .then(() => getById(tweetId));
}

export async function remove(tweetId) {
  return db.execute('DELETE FROM tweets WHERE id=?', [tweetId]);
}
