const db = require('./server/db');
const { green, red } = require('chalk');
const Task = require('./server/db/models/task');
const User = require('./server/db/models/user');

const userData = [
  {
    userName: 'aCortez',
    firstName: 'Anna',
    lastName: 'Cortez',
    email: 'acortez@gmail.com',
    profileUrl: 'http://localhost:8081/public/img/avatars/Image2.png',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    skills: 'data analysis, research, graphic design',
    password: '123',
    campaign: true,
  },
  {
    userName: 'iBorne',
    firstName: 'Izzy',
    lastName: 'Borne',
    email: 'iborne@gmail.com',
    profileUrl: 'http://localhost:8081/public/img/avatars/Image1.png',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    skills: 'data analysis, research, graphic design',
    password: '123',
  },
  {
    userName: 'jSmith',
    firstName: 'John',
    lastName: 'Smith',
    email: 'jsmith@gmail.com',
    profileUrl: 'http://localhost:8081/public/img/avatars/Image7.png',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    skills: 'data analysis, research, graphic design',
    password: '123',
  },
  {
    userName: 'fJones',
    firstName: 'Frank',
    lastName: 'Jones',
    email: 'fjones@gmail.com',
    profileUrl: 'http://localhost:8081/public/img/avatars/Image5.png',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    skills: 'data analysis, research, graphic design',
    password: '123',
  },
  {
    userName: 'vSamson',
    firstName: 'Vickie',
    lastName: 'Samson',
    email: 'vsamson@gmail.com',
    profileUrl: 'http://localhost:8081/public/img/avatars/Image4.png',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    skills: 'data analysis, research, graphic design',
    password: '123',
  },
  {
    userName: 'jJohnson',
    firstName: 'Josie',
    lastName: 'Johnson',
    email: 'jj@gmail.com',
    profileUrl: 'http://localhost:8081/public/img/avatars/Image6.png',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    skills: 'data analysis, research, graphic design',
    password: '123',
  },
];

const TaskData = [
  {
    title: 'Phone Bank',
    imageUrl: 'http://localhost:8081/public/img/photo45.png',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Review Press Release',
    imageUrl: 'http://localhost:8081/public/img/photo46.png',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Update Website',
    imageUrl: 'http://localhost:8081/public/img/photo47.png',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Graphic Design',
    imageUrl: 'http://localhost:8081/public/img/photo48.png',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    for (const task of TaskData) {
      await Task.create(task);
    }
    for (const user of userData) {
      await User.create(user);
    }
    console.log(green('Seeding success!'));
  } catch (error) {
    console.error(error);
  }
  db.close();
};

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'));
  console.error(err);
  db.close();
});
