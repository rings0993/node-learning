const fs = require('fs');
const express = require('express');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(val);
  const tour = tours[req.params.id];

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'successs',
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
  res.status(200).json({
    status: 'successs',
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  // console.log(req.params);
  // console.log(tours[req.params.id]);

  res.status(200).json({
    status: 'successs',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // console.log(req.params);
  // console.log(tours[req.params.id]);

  res.status(204).json({
    status: 'successs',
    data: {
      tour: 'None',
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'successs',
        data: {
          tours: newTour,
        },
      });
    }
  );
};
