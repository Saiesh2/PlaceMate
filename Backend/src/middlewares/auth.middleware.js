import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';

export const protectRoute = async (req, res, next) => {
    try {
        let token;

        // Check for token in cookies first
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        } 
        // Then check Authorization header
        else if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new ApiError(401, "Not authorized, no token");
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                throw new ApiError(401, "User not found");
            }

            req.user = user;
            next();
        } catch (error) {
            throw new ApiError(401, "Not authorized, token failed");
        }
    } catch (error) {
        next(error);
    }
};
