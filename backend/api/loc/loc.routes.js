import express from 'express'

import { getGeoLocation } from './loc.controller.js'

const router = express.Router()

router.get('/:geokey', getGeoLocation)

export const locationRoutes = router
