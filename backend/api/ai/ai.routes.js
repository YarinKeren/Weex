import express from 'express'

import { generateImage, generateText } from './ai.controller.js'

const router = express.Router()

router.get('/text/:prompt', generateText)
router.get('/image/:prompt', generateImage)

export const aiRoutes = router
