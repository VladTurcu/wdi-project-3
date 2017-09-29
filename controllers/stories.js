const Story = require('../models/story');

function storiesIndex(req, res) {
  Story
    .find()
    .exec()
    .then(stories => res.json(stories))
    .catch(err => res.json(err));
}

function storiesShow(req, res) {
  Story
    .findById(req.params.id)
    .exec()
    .then(story => res.json(story))
    .catch(err => res.json(err));
}

function storiesCreate(req, res) {
  Story
    .create(req.body)
    .then(story => res.status(201).json(story))
    .catch(err => res.json(err));
}

function storiesUpdate(req, res) {
  Story
    .findById(req.params.id)
    .exec()
    .then(story => {
      Object.assign(story, req.body);
      return story.save();
    })
    .then(story => res.json(story))
    .catch(err => console.log(err));
}

function storiesDelete(req, res) {
  Story
    .findById(req.params.id)
    .exec()
    .then(story => {
      return story.remove();
    })
    .then(() => res.status(204).end())
    .catch(err => console.log(err));
}

module.exports = {
  index: storiesIndex,
  show: storiesShow,
  create: storiesCreate,
  update: storiesUpdate,
  delete: storiesDelete
};
