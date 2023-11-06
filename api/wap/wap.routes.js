import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { getWaps, getWapById, getWapByUrl, addWap, updateWap, removeWap } from './wap.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getWaps)
router.get('/:id', getWapById)
router.get('/url/:url', getWapByUrl)
router.post('/', addWap)
router.put('/:id', updateWap)
router.delete('/:id', removeWap)
// router.delete('/:id', requireAuth, requireAdmin, removeWap) // only admins can delete waps

// router.post('/:id/msg', requireAuth, addWapMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeWapMsg)

export const wapRoutes = router
