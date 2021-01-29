import { Router } from 'express';
import {
  createOwner,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controller/ownerController';

const router = Router();

router.route('/').post(createOwner).get(getAllUsers);
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

export default router;
