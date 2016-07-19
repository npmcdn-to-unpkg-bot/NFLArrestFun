var request = require('request');
var rp = require('request-promise');
var models = require('../models');
var _ = require('lodash');
var Promise = require('bluebird');
var cheerio = require('cheerio');


var API_PLAYER_ARREST_ENDPOINT = "http://nflarrest.com/api/v1/player/arrests";
var WIKI_LINK_BASE = "https://en.wikipedia.org/wiki/";


models.Player.drop()
  .then(function() { return models.Player.sync(); })
  .then(function() { return rp('http://www.nflarrest.com/api/v1/player'); })
  .then(function(playersResponse) {
    var playerArrests = _.map(JSON.parse(playersResponse), function(player) {
      var urlEncodedName = encodeURI(player.Name);
      var url = API_PLAYER_ARREST_ENDPOINT + "/" + urlEncodedName;
      var options = {
        uri: url,
        json: true
      };

      return Promise.delay(500).then(function(){ return rp(options); }).then(function(arrestsForPlayerResponse) {
        var arrests = arrestsForPlayerResponse;
        var player = arrests[0];
        return {
          name: player.Name,
          team: player.Team,
          position: player.Position,
          arrestCount: arrests.length
        }
      }).catch(function(err) {
        console.log("ERROR!!!!!!", url, err.statusCode);
      });

    });

    Promise.all(playerArrests).then(function(players) {
      var draftPickRequests = _.map(players, function(player) {
        if(player){
          var wikiName = player.name.replace(' ', '_');
          var wikilink = WIKI_LINK_BASE + wikiName;
          return rp({uri: wikilink, json: false}).then(function(wikiForPlayer){
            var $ = cheerio.load(wikiForPlayer);
            var draftData = $(".infobox.vcard").find('td:contains("Pick")');
            var html = draftData.html()
            if (html) {

              var parsedPick = html.split("Pick:&#xA0;")[1];
              if(parsedPick) {
                parsedPick = parseInt(parsedPick);
                if(!isNaN(parsedPick)){
                  player.wikilink = wikilink;
                  player.draftPick = parsedPick;
                }
              }
            } else {
              console.log("NO DRAFT DATA", wikilink);
            }
            return player;
          }).catch(function (err) {
            console.log("WIKI ERROR:", wikilink, err.statusCode);
          });
        }
      });
      Promise.all(draftPickRequests).then(function(players) {
        models.Player.bulkCreate(_.filter(players, function(player) {return player;})).then(function(){
          console.log('Done!');
        });
      });

    });
  });
