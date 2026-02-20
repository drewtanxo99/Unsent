const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function useLetters() {
    async function fetchLetters() {
        const res = await fetch(`${BASE_URL}/api/letters`)
        if (!res.ok) throw new Error('Failed to fetch letters')
        return res.json()
    }

    async function fetchLetter(id) {
        const res = await fetch(`${BASE_URL}/api/letters/${id}`)
        if (!res.ok) throw new Error('Letter not found')
        return res.json()
    }

    async function createLetter({ to, body }) {
        const res = await fetch(`${BASE_URL}/api/letters`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to, body }),
        })
        if (!res.ok) throw new Error('Failed to create letter')
        return res.json()
    }

    async function deleteLetter(id) {
        const res = await fetch(`${BASE_URL}/api/letters/${id}`, {
            method: 'DELETE',
        })
        if (!res.ok) throw new Error('Failed to delete letter')
        return res.json()
    }

    return { fetchLetters, fetchLetter, createLetter, deleteLetter }
}
