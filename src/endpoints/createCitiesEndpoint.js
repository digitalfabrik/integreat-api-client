// @flow

import CityModel from '../models/CityModel'
import EndpointBuilder from '../EndpointBuilder'
import Endpoint from '../Endpoint'
import type { JsonCityType } from '../types'
import CategoriesMapModel from '../models/CategoriesMapModel'

const stripSlashes = (path: string): string => {
  if (path.startsWith('/')) {
    path = path.substr(1)
  }
  if (path.endsWith('/')) {
    path = path.substr(0, path.length - 1)
  }
  return path
}

export default (baseUrl: string): Endpoint<void, Array<CityModel>> => new EndpointBuilder('cities')
  .withParamsToUrlMapper(() => `${baseUrl}/wp-json/extensions/v3/sites`)
  .withMapper((json: Array<JsonCityType>) => json.map(city => new CityModel({
    name: city.name,
    code: stripSlashes(city.path),
    live: city.live,
    eventsEnabled: city.events,
    extrasEnabled: city.extras,
    sortingName: city.name_without_prefix
  })).sort((city1, city2) => city1.sortingName.localeCompare(city2.sortingName)))
  .build()