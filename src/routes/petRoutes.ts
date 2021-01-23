import { Router } from 'express';
import {
  createPet,
  getAllPets,
  getPet,
  updatePet,
} from '../controller/petController';

const router = Router();

router.route('/').post(createPet).get(getAllPets);
router.route('/:petId').get(getPet).put(updatePet);

export default router;
