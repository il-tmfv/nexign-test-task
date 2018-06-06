import { SteamIdException, FetchException } from './errors';

const headers = new Headers({
  Accept: 'application/json',
});

const getRequest = async url => {
  let response;

  try {
    response = await fetch(url, {
      headers,
      mode: 'cors',
    });
  } catch (e) {
    throw new FetchException(e.message);
  }

  if (!response.ok) {
    throw new FetchException('Response was not ok');
  }

  return response.json();
};

export const getSteamIdByCommunityUrl = async (key, userVanityUrlName) => {
  const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${key}&vanityurl=${userVanityUrlName}`;

  const response = await getRequest(url);

  if (response.success === 1) {
    return response.steamid;
  }

  throw new SteamIdException(response.message);
};
