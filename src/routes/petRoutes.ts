import { Router } from 'express';
import {
  createPet,
  getAllPets,
  getPet,
  updatePet,
  deletePet,
} from '../controller/petController';

const router = Router();

router.route('/').post(createPet).get(getAllPets);
router.route('/:petId').get(getPet).put(updatePet).delete(deletePet);

export default router;
