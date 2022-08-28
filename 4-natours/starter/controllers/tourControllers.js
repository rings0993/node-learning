const Tour = require('./../models/tourModel');
const express = require('express');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    // result: tours.length
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params);
  // console.log(tours[req.params.id]);
  // const tour = tours[req.params.id];
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.updateTour = (req, res) => {
  // console.log(req.params);
  // console.log(tours[req.params.id]);

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // console.log(req.params);
  // console.log(tours[req.params.id]);

  res.status(204).json({
    status: 'success',
    data: {
      tour: 'None',
    },
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
