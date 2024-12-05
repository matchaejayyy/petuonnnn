import { Request, Response } from 'express';
import { pool, router } from '../database/CarmineDB'

// Fetch all notes
// In your Express route (backend)
router.get('/getNotes', async (req: Request, res: Response) => {
    try {
        // Assuming you're using a database like PostgreSQL
        const result = await pool.query('SELECT * FROM notes');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Error fetching notes' });
    }
});


// Insert a new note
router.post('/insertNote', async (req: Request, res: Response) => {
    console.log('Request body:', req.body); // Log the request body

    const { title, content, color, created_date, created_time } = req.body;

    if (!title || !content || !color || !created_date || !created_time) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const query = `
            INSERT INTO notes (title, content, color, created_date, created_time)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;

        const result = await pool.query(query, [title, content, color, created_date, created_time]);
        console.log('Inserted note:', result.rows[0]); // Log the inserted note

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a note
router.delete('/deleteNote/:id', async (req: Request, res: Response) => {
    const { id } = req.params;  // Make sure we use "id" here as per the table definition

    if (!id) {
        return res.status(400).json({ message: 'Missing note_id' });
    }

    try {
        // Use the correct column name ("id") in the SQL query
        const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *;', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted', deletedNote: result.rows[0] });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a note
router.patch('/updateNote/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, updatedAt } = req.body;

    // Validate input
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    try {
        const query = `
            UPDATE notes 
            SET title = $1, content = $2, updated_at = $3
            WHERE id = $4
            RETURNING *;
        `;
        const values = [title, content, updatedAt || new Date().toISOString(), id];

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        return res.status(200).json({ message: 'Note updated successfully.', note: result.rows[0] });
    } catch (error) {
        console.error('Error updating note:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
