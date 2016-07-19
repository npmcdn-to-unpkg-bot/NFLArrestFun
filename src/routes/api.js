var express = require('express');
var models = require('../models');
var _ = require('lodash');

var router = express.Router();


/* GET data listing. */
router.get('/players', function(req, res, next) {
  models.Player.findAll({where: {draftPick: {$ne: null}}}).then(function(players){
    res.send(JSON.stringify(_.map(players, function(player) {
      return player.toJSON();
    })));
  }).catch(function(err) {
    console.log('ERROR', err);
    res.status(500).send('ERROR');
  });
});

module.exports = router;