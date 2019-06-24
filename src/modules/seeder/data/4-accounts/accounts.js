const { getObjectId } = require('../../helpers');

const directors_names = ['dir1', 'dir2', 'dir3'];
const directors_password = 'secret';

module.exports = directors_names.map(name => ({
    name: name + '@test.com',
    password: directors_password,
    _id: getObjectId(name),
    _director: getObjectId(name)
}));