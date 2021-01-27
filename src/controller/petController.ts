import { Request, Response } from 'express';
import Pet from '../entities/Pet';

export const createPet = async (req: Request, res: Response) => {
  const { PetName } = req.body;
  try {
    // Validate Data
    let errors: any = {};
    const petName = await Pet.findOne({ PetName });

    if (petName) errors.PetName = 'Petname is already taken';
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    const newPet = new Pet(req.body);
    await newPet.save();
    return res.json(newPet);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const allPets = await Pet.find({
      order: { IsActive: 1, createAt: 'DESC' },
      relations: ['PetOwnerID'],
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
  console.log(req.body);
  try {
    const pet = await Pet.update(petId, req.body);
    return res.json(pet);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
