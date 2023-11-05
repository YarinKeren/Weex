import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { getWaps, getWapById, addWap, updateWap, removeWap } from './wap.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getWaps)
router.get('/:id', getWapById)
router.post('/', requireAuth, addWap)
router.put('/:id', requireAuth, updateWap)
router.delete('/:id', requireAuth, removeWap)
// router.delete('/:id', requireAuth, requireAdmin, removeWap) // only admins can delete waps

// router.post('/:id/msg', requireAuth, addWapMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeWapMsg)

export const wapRoutes = router
