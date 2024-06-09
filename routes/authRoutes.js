import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  async (req, res, next) => {
    try {
      // retrieve data from request body
      const { email, password } = req.body;
      
      // call authentication service
      const user = await authService.login(email, password);
      
      // if successful
      res.data = user;
    } catch (err) {
      // catch exception
      res.err = err;
    } finally {
      
      next();
    }
  },
  responseMiddleware // Middleware para manejar la respuesta
);

export { router };
