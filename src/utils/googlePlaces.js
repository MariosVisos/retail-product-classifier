import { googlePlaces } from '../constants/api';

const { apiKey, baseUrl, nearbySearchEndpoint, photoEndpoint } = googlePlaces;

function addParameterToUrl(url, param) {
  const { key, value } = param;
  const newUrl = `${url}&${key}=${value}`;
  return newUrl;
}
const keyParam = {
  key: 'key',
  value: apiKey,
};

export function buildSearchLocationUrl(latitude, longitude) {
  // const url = `${baseUrl}/${nearbySearchEndpoint}/&radius=300&location=${latitude},${longitude}`;
  let url = `${baseUrl}/${nearbySearchEndpoint}`;
  const typeParam = {
    key: 'type',
    value: 'supermarket',
  };
  const locationParam = {
    key: 'location',
    value: `${latitude},${longitude}`,
  };
  // const radiusParam = { key: 'radius', value: 3000 };
  const rankByParam = { key: 'rankby', value: 'distance' };
  url = addParameterToUrl(url, keyParam);
  url = addParameterToUrl(url, typeParam);
  url = addParameterToUrl(url, rankByParam);
  url = addParameterToUrl(url, locationParam);
  return url;
}

export function buildGetPhotoByReferenceUrl(reference) {
  let url = `${baseUrl}/${photoEndpoint}`;
  const maxWidthParam = {
    key: 'maxwidth',
    value: 400,
  };
  const photoReferenceParam = {
    key: 'photoreference',
    value: reference,
  };
  url = addParameterToUrl(url, keyParam);

  url = addParameterToUrl(url, maxWidthParam);
  url = addParameterToUrl(url, photoReferenceParam);
  return url;
}
