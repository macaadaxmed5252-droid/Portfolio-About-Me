import { validationResult } from 'express-validator';

/**
 * Middleware to run after express-validator chains.
 * If there are validation errors, returns a 422 with the first error message.
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array()[0].msg,
            errors: errors.array(),
        });
    }
    next();
};
