const router = require('express').Router();
const User = require('../db/models/user');
const Task = require('../db/models/task');

//Get all tasks /api/tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// Get single taks /api/tasks/id

router.get('/:id', async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const singleTask = await Task.findOne({
      where: { id: taskId },
      include: [{ model: User }],
    });
    res.json(singleTask);
    console.log(singleTask);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
