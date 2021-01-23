import { Request, Response } from 'express';
import Pet from '../entities/Pet';

export const createPet = async (req: Request, res: Response) => {
  try {
    const netPet = new Pet(req.body);
    await netPet.save();

    return res.json(netPet);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const allPets = await Pet.find({
      order: { createAt: 'DESC' },
      relations: ['OwnerId'],
    });
    return res.json(allPets);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getPet = async (req: Request, res: Response) => {
  const { petId } = req.params;
  try {
    const pet = await Pet.findOneOrFail(petId, { relations: ['PetOwnerID'] });

    return res.json(pet);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updatePet = async (req: Request, res: Response) => {
  const { petId } = req.params;
  try {
    const pet = await Pet.update(petId, { ...req.body });

    return res.json(pet);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
