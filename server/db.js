import { JSONFilePreset } from 'lowdb/node'
import { randomUUID } from 'crypto'

const defaultData = { letters: [] }
const db = await JSONFilePreset('db.json', defaultData)

export async function getAllLetters() {
    await db.read()
    return [...db.data.letters].sort((a, b) => b.createdAt - a.createdAt)
}

export async function getLetterById(id) {
    await db.read()
    return db.data.letters.find(l => l.id === id) || null
}

export async function createLetter({ to, body }) {
    await db.read()
    const letter = {
        id: randomUUID(),
        to,
        body,
        date: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }),
        createdAt: Date.now(),
    }
    db.data.letters.push(letter)
    await db.write()
    return letter
}

export async function deleteLetter(id) {
    await db.read()
    const before = db.data.letters.length
    db.data.letters = db.data.letters.filter(l => l.id !== id)
    await db.write()
    return db.data.letters.length < before
}
