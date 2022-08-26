const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    statis: 'successs',
    requestTime: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  // console.log(req.params);
  // console.log(tours[req.params.id]);
  const tour = tours[req.params.id];
  if (!tour) {
    res.status(404).json({
      statis: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    statis: 'successs',
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  // console.log(req.params);
  // console.log(tours[req.params.id]);
  const tour = tours[req.params.id];
  if (!tour) {
    res.status(404).json({
      statis: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    statis: 'successs',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

const deleteTour = (req, res) => {
  // console.log(req.params);
  // console.log(tours[req.params.id]);
  const tour = tours[req.params.id];
  if (!tour) {
    res.status(404).json({
      statis: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    statis: 'successs',
    data: {
      tour: 'None',
    },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        statis: 'successs',
        data: {
          tours: newTour,
        },
      });
    }
  );

  // res.send('Done');
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet defined',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

const userRouter = express.Router();
app.use('/api/v1/users', userRouter);
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
