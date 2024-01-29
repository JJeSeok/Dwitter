let users = [
  {
    id: '1',
    username: 'bob',
    // password: 12345
    password: `$2b$12$pb3pMw0I.WQnl0Jfb1PVzej5jS99Uqe/d.DG8CGVW2BhyHY4X/B46`,
    name: 'Bob',
    email: 'bob@gmail.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    username: 'jo',
    // password: qwert
    password: `$2b$12$Gu/QU.XDlV2Bgp/CgInDau2453VOYVr6Bq5TDQfgY9GOrz1n2ZkrO`,
    name: 'Jo',
    email: 'jo@naver.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

export async function create(Info) {
  const user = { id: (users.length + 1).toString(), ...Info };
  users.push(user);
  return user.id;
}

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}
