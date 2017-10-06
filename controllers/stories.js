const Story = require('../models/story');

function storiesIndex(req, res, next) {
  Story
    .find()
    .populate('createdBy')
    .exec()
    .then(stories => res.json(stories))
    .catch(next);
}

function storiesShow(req, res, next) {
  Story
    .findById(req.params.id)
    .populate('createdBy places')
    .exec()
    .then(story => res.json(story))
    .catch(next);
}

function storiesCreate(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.currentUser;
  Story
    .create(req.body)
    .then((story) => {
      res.status(201).json(story);
    })
    .catch(next);
}

function storiesUpdate(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.currentUser;
  Story
    .findById(req.params.id)
    .exec()
    .then(story => {
      Object.assign(story, req.body);
      return story.save();
    })
    .then(story => res.json(story))
    .catch(next);
}

function storiesDelete(req, res, next) {
  Story
    .findById(req.params.id)
    .exec()
    .then(story => {
      if(!story) return res.notFound();
      return story.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: storiesIndex,
  show: storiesShow,
  create: storiesCreate,
  update: storiesUpdate,
  delete: storiesDelete
};
