import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [sequelize.col('user.name'), 'name'],
    [sequelize.col('user.username'), 'username'],
    [sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = {
  order: [['createdAt', 'DESC']],
};

export async function getAll() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  });
}

export async function getById(tweetId) {
  return Tweet.findOne({
    where: { id: tweetId },
    ...INCLUDE_USER,
  });
}

export async function create(text, userId) {
  return Tweet.create({ text, userId }) //
    .then((data) => getById(data.dataValues.id));
}

export async function update(tweetId, text) {
  return Tweet.findByPk(tweetId, INCLUDE_USER) //
    .then((tweet) => {
      tweet.text = text;
      return tweet.save();
    });
}

export async function remove(tweetId) {
  return Tweet.findByPk(tweetId) //
    .then((tweet) => {
      tweet.destroy();
    });
}
