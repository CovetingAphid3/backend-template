import Joi from 'joi';

export const ticketSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    userId: Joi.string().required(), // Adjust based on your ID type
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    assignedTo: Joi.string().optional(), // Adjust based on your ID type
    status: Joi.string().valid('open', 'in progress', 'closed').optional(),
    comments: Joi.array().items(Joi.object({
        userId: Joi.string().required(), // Ensure this matches your user ID type
        comment: Joi.string().required(),
        timestamp: Joi.date().default(Date.now) // Optionally set a default for timestamp
    })).optional() // Mark comments as optional if you don't want to require it
});

