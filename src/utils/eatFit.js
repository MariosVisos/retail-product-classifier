import { eatFit } from '../constants/api';

const { baseUrl, productEndpoint } = eatFit;

export default function buildGetProductByBarCodeUrl(barCode) {
  const url = `${baseUrl}/${productEndpoint}/${barCode}/`;
  return url;
}
