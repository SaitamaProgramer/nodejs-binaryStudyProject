import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

//get all fighter

router.get('/', async (req, res, next) => {
  try {
    const fighters = await fighterService.getAll();
    res.json(fighters);
  } catch (error) {
    next(error);
  }
});


//get fighter by ID
router.get('/:id', async (req, res, next) => {
  try {
    const fighter = await fighterService.getById(req.params.id);
    if (!fighter) {
      return res.status(404).json({ error: true, message: 'Fighter not found' });
    }
    res.json(fighter);
  } catch (error) {
    next(error);
  }
});


//CREATE new fighter
router.post('/', createFighterValid, async (req, res, next) => {
  try {
    const fighter = await fighterService.create(req.body);
    res.status(201).json(fighter);
  } catch (error) {
    next(error);
  }
});


// UPDATE fighter
router.patch('/:id', updateFighterValid, async (req, res, next) => {
  try {
    const fighter = await fighterService.update(req.params.id, req.body);
    if (!fighter) {
      return res.status(404).json({ error: true, message: 'Fighter not found' });
    }
    res.json(fighter);
  } catch (error) {
    next(error);
  }
});
  //DELETE fighter by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const fighter = await fighterService.delete(req.params.id);
    if (!fighter) {
      return res.status(404).json({ error: true, message: 'Fighter not found' });
    }
    res.json({ message: 'Fighter deleted successfully' });
  } catch (error) {
    next(error);
  }
});

router.use(responseMiddleware);

export { router };

