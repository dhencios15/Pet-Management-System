import { Request, Response } from 'express';
import Owner from '../entities/Owner';

export const createOwner = async (req: Request, res: Response) => {
  const { OwnerName, OwnerEmail } = req.body;
  try {
    // Validate Data
    let errors: any = {};
    const ownerName = await Owner.findOne({ OwnerName });
    const ownerEmail = await Owner.findOne({ OwnerEmail });

    if (ownerName) errors.PetName = 'Owner name is already taken';
    if (ownerEmail) errors.OwnerEmail = 'Email is already taken';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

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
      order: { IsActive: 1, createAt: 'DESC' },
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
