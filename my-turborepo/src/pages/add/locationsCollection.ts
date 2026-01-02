import { buildingsObj, buildingsObject } from "./locationsBuildings";

const seoulKeysArray = Object.keys(buildingsObj.se)
const globalKeysArray = Object.keys(buildingsObj.gu)
const gwangneungKeysArray = Object.keys(buildingsObj.gw)
const keysArray = seoulKeysArray.concat([...gwangneungKeysArray, ... globalKeysArray])
const locationsCollection = {
  ko: Object.fromEntries(
    keysArray.map((value) => [value, buildingsObj[value.slice(0, 2)][value].ko.details])
  ),
  en: Object.fromEntries(
    keysArray.map((value) => [value, buildingsObj[value.slice(0, 2)][value].en.details])
  ),
};
export default locationsCollection

