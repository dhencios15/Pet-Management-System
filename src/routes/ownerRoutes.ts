import { Router } from 'express';
import {
  createOwner,
  getAllUsers,
  getUser,
  updateUser,
} from '../controller/ownerController';

const router = Router();

router.route('/').post(createOwner).get(getAllUsers);
router.route('/:userId').get(getUser).put(updateUser);

export default router;
