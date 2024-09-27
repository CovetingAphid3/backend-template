import { Request, Response } from 'express';
import TicketModel from '../models/Tickets';
import { ITicket } from '../models/Tickets';
import { ticketSchema } from '../validation/ticketValidation'; // Import the validation schema

// Create a new ticket
export const createTicket = async (req: Request, res: Response): Promise<Response> => {
    const { error } = ticketSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, userId, priority, assignedTo, comments } = req.body;

    // Set default status if not provided
    const status = req.body.status || 'open'; // Default to 'open'

    try {
        const newTicket: ITicket = await TicketModel.create({ title, description, userId, priority, assignedTo, status, comments });
        return res.status(201).json(newTicket);
    } catch (error) {
        return res.status(500).json({ message: error || 'Error creating ticket' });
    }
};



// Add a comment to a ticket
export const addComment = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { userId, comment } = req.body;

  if (!userId || !comment) {
    return res.status(400).json({ message: 'userId and comment are required' });
  }

  try {
    const updatedTicket = await TicketModel.findByIdAndUpdate(
      id,
      { $push: { comments: { userId, comment, timestamp: new Date() } } },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return res.status(200).json(updatedTicket);
  } catch (error) {
    return res.status(500).json({ message: error || 'Error adding comment' });
  }
};


// Get all tickets
export const getTickets = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tickets: ITicket[] = await TicketModel.find();
    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getTicketById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params; // Extract the id parameter
    const ticket = await TicketModel.findById(id); // Use findById to find the ticket

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(500).json({ message: error || 'Internal server error' });
  }
};


// Update a ticket status
export const updateTicketStatus = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const updatedTicket = await TicketModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return res.status(200).json(updatedTicket);
  } catch (error) {
    return res.status(500).json({ message: error || 'Error updating ticket status' });
  }
};

// Delete a ticket
export const deleteTicket = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const deletedTicket: ITicket | null = await TicketModel.findByIdAndDelete(id);

    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error || 'Error deleting ticket' });
  }
};

