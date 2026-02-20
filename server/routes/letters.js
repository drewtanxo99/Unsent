import express from 'express'
import {
    getAllLetters,
    getLetterById,
    createLetter,
    deleteLetter,
} from '../db.js'

const router = express.Router()

// GET /api/letters — return all letters, newest first
router.get('/', async (req, res) => {
    try {
        const letters = await getAllLetters()
        res.json(letters)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch letters' })
    }
})

// POST /api/letters — create a new letter
router.post('/', async (req, res) => {
    const { to, body } = req.body
    if (!to || !body) {
        return res.status(400).json({ error: 'Both "to" and "body" fields are required' })
    }
    try {
        const letter = await createLetter({ to, body })
        res.status(201).json(letter)
    } catch (err) {
        res.status(500).json({ error: 'Failed to create letter' })
    }
})

// GET /api/letters/:id — return single letter by id
router.get('/:id', async (req, res) => {
    try {
        const letter = await getLetterById(req.params.id)
        if (!letter) return res.status(404).json({ error: 'Letter not found' })
        res.json(letter)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch letter' })
    }
})

// DELETE /api/letters/:id — permanently delete letter
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await deleteLetter(req.params.id)
        if (!deleted) return res.status(404).json({ error: 'Letter not found' })
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete letter' })
    }
})

export default router
