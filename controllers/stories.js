const Story = require('../models/story');

function storiesIndex(req, res) {
  Story
    .find()
    .exec()
    .then(stories => res.json(stories))
    .catch(err => res.json(err));
}

module.exports = {
  index: storiesIndex
};
