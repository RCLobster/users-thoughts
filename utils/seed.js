const connection = require('../config/connection');
const { Users } = require('../models');
const { userData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist  
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const user = [];

  for(let x=0; x<userData.length; x++){
    const username = userData[x].username;
    const email = userData[x].email;

    user.push({
      username,
      email,
    });
  }
  //console.log(user);

  await Users.collection.insertMany(user);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(user);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
