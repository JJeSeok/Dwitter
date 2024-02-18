import { getUsers } from '../db/database.js';
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;

export async function create(Info) {
  return getUsers()
    .insertOne(Info)
    .then((data) => data.insertedId.toString());
}

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username }) //
    .then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
