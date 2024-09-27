import express from 'express';
import {
    createTicket,
    getTickets,
    updateTicketStatus,
    deleteTicket,
    addComment,
    getTicketById
} from '../controllers/ticketController';

const router = express.Router();

// Routes for ticket operations
router.post('/tickets', createTicket); // Create a new ticket
router.get('/tickets', getTickets); // Get all tickets
router.get('/tickets/:id', getTicketById); // Get all tickets
router.put('/tickets/:id', updateTicketStatus); // Update a ticket by ID
router.delete('/tickets/:id', deleteTicket); // Delete a ticket by ID
router.patch('/tickets/:id/comments', addComment); // Add a comment to a ticket

export default router;

