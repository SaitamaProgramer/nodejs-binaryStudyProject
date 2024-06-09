import { Router } from 'express';
import { userService } from '../services/userService.js';
import {
  createUserValid,
  updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

//GET all users

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

//GET user by ID

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: true, message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});


//CREATE new user 
router.post('/', createUserValid, async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});


// UPDATE user
router.patch('/:id', updateUserValid, async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: true, message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});


      // DELETE user by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: true, message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.use(responseMiddleware);

export { router };

