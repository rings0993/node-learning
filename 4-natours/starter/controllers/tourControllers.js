const fs = require('fs');
const express = require('express');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    statis: 'successs',
    requestTime: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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

exports.createTour = (req, res) => {
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
};
