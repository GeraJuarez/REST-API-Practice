const { getObjectId } = require('../../helpers');

const directors_names = ['dir1', 'dir2', 'dir3'];

module.exports = directors_names.map(name => ({
    name: name,
    _id: getObjectId(name)
}));