import { Request, Response } from 'express';
import Owner from '../entities/Owner';

export const createOwner = async (req: Request, res: Response) => {
  try {
    const newUser = new Owner(req.body);
    await newUser.save();

    return res.json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await Owner.find({
      order: { createAt: 'DESC' },
      relations: ['OwnerPets'],
    });

    return res.json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await Owner.findOneOrFail(userId, {
      relations: ['OwnerPets'],
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const updatedUser = await Owner.update(userId, { ...req.body });
    console.log(updatedUser);
    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
