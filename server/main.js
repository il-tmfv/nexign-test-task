const express = require('express');
const app = express();
const request = require('request-promise-native');
const _ = require('lodash');

app.set('port', 3333);

function getOptions(url) {
  return {
    method: 'GET',
    url,
    resolveWithFullResponse: true,
  };
}

const STEAM_API_KEY = process.env.STEAM_API_KEY;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

async function getOwnedGames(steamids) {
  const promisesForAllSteamIds = [];

  for (let id of steamids) {
    const ownedGamesUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${id}&format=json`;
    promisesForAllSteamIds.push(request(getOptions(ownedGamesUrl)));
  }

  const ownedGamesResponse = await Promise.all(promisesForAllSteamIds);
  return ownedGamesResponse.map(x => JSON.parse(x.body).response.games);
}

async function filterOnlyMultiplayer(onlyCommonGames) {
  const promisesForAllGames = [];

  for (let game of onlyCommonGames) {
    const steamSpyUrl = `http://steamspy.com/api.php?request=appdetails&appid=${game.appid}`;
    promisesForAllGames.push(request(getOptions(steamSpyUrl)));
  }

  const steamSpyResponses = await Promise.all(promisesForAllGames);
  return steamSpyResponses
    .map(x => JSON.parse(x.body))
    .filter(x => 'Multiplayer' in x.tags)
    .map(x => ({ name: x.name, appid: x.appid }));
}

app.get('/common-games', async function(req, res) {
  const steamids = req.query['steamids'];
  let ownedGames;
  let response;

  try {
    ownedGames = await getOwnedGames(steamids);
  } catch (e) {
    res.status(400).send({ message: `Bad '/steamid' @ GetOwnedGames request: ${e}` });
    return;
  }

  // append 'appid' because it will be used as the last arg of the intersectionBy func
  const onlyCommonGames = _.intersectionBy.apply(null, [...ownedGames, 'appid']);

  try {
    response = await filterOnlyMultiplayer(onlyCommonGames);
  } catch (e) {
    res.status(400).send({ message: `Bad '/steamid' @ SteamSpy request: ${e}` });
    return;
  }

  res.send(response);
});

app.get('/steamid', async function(req, res) {
  const username = req.query['username'];
  const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${username}`;

  try {
    const response = await request(getOptions(url));
    res.send(response.body);
  } catch (e) {
    res.status(400).send({ message: `Bad '/steamid' request: ${e}` });
  }
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(app.get('port'), function() {
  console.log('Started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
