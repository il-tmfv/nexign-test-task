import { SteamIdException, FetchException } from './errors';

const BASE_URL = 'http://localhost:3333';

const headers = new Headers({
  Accept: 'application/json',
});

const getRequest = async url => {
  let response;

  try {
    response = await fetch(url, {
      headers,
    });
  } catch (e) {
    throw new FetchException(e.message);
  }

  if (!response.ok) {
    throw new FetchException('Response was not ok');
  }

  return response.json();
};

export const getSteamIdByCommunityUrl = async username => {
  const url = `${BASE_URL}/steamid?username=${username}`;

  const { response } = await getRequest(url);

  if (response.success === 1) {
    return response.steamid;
  }
  throw new SteamIdException(response.message);
};

export const getCommonMultiplayerGames = async steamids => {
  const steamidsString = steamids.map(x => `steamids[]=${x}`).join('&');

  const url = `${BASE_URL}/common-games?${steamidsString}`;

  return await getRequest(url);
};
