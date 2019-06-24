const path = require('path');
const config_db = require('../../config');
const { Seeder } = require('mongo-seeding');

const config = {
  database: config_db.db_url,
  dropDatabase: true,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
  path.resolve('./src/modules/seeder/data')
);

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch(err => {
    console.log('Error', err);
  });
