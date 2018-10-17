import '@babel/polyfill'
import 'now-env'

import Koa from 'koa'
import logger from 'koa-logger'
import cors from '@koa/cors'
import db from './db'
import Location from './model'

db(process.env.DB_URI)

const app = new Koa()

app.use(cors())
app.use(logger())

app.use(async (ctx) => {
  const {
    limit = 100,
    latitude = 50.850340,
    longitude = 4.351710,
    distanceKm = 50
  } = ctx.request.query

  const maxDistanceInMeters = distanceKm * 1000

  try {
    const locations = await Location
      .find({
        'geometry.location': {
          $near: {
            $geometry: { type: 'Point', coordinates: [longitude, latitude] },
            $minDistance: 0,
            $maxDistance: maxDistanceInMeters
          }
        }
      })
      .where({ map: true, active: true })
      .select('slug cover title url tags address kind cover featured')
      .limit(limit)

    if (!locations.length) {
      ctx.throw(404, 'no locations found', {
        status: 404,
        message: 'No locations found',
        data: null
      })
    }

    ctx.body = {
      data: locations
    }
  } catch (err) {
    ctx.throw(500, 'error', {
      status: 500, err
    })
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log('Listening on port', PORT)
})
