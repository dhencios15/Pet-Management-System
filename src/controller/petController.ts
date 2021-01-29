import { IPet } from './../../pet-app/src/helpers/types';
import { Request, Response } from 'express';
import Owner from '../entities/Owner';
import Pet from '../entities/Pet';

const findPetByOwner = async (
  ownerId: number,
  petName: string,
  petId: number = 0
) => {
  let findOwnerPet: any;
  const petOwner = await Owner.findOne(
    { OwnerId: ownerId },
    {
      relations: ['OwnerPets'],
    }
  );

  if (petId > 0) {
    findOwnerPet = petOwner.OwnerPets.filter((pet) => pet.PetID !== petId).find(
      (petOwn) => petOwn.PetName === petName
    );
  } else {
    findOwnerPet = petOwner.OwnerPets.find(
      (petOwn) => petOwn.PetName === petName
    );
  }

  console.log('found', findOwnerPet);

  return !!findOwnerPet;
};

export const createPet = async (req: Request, res: Response) => {
  const { PetName, PetOwnerID } = req.body;
  try {
    const ownerHasSameNamePet = await findPetByOwner(PetOwnerID, PetName, 0);
    if (ownerHasSameNamePet) {
      return res.status(404).json(`Pet name already taken`);
    } else {
      const newPet = new Pet(req.body);
      await newPet.save();
      return res.json(newPet);
    }
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
  const { PetOwnerID, PetName } = req.body;

  try {
    let ownerHasSameNamePet;
    if (PetName) {
      ownerHasSameNamePet = await findPetByOwner(PetOwnerID, PetName, +petId);
    }

    if (ownerHasSameNamePet) {
      return res.status(404).json(`Pet name already taken`);
    } else {
      const pet = await Pet.update(petId, req.body);
      return res.json(pet);
    }
  } catch (error) {
    console.log('ERROR');
    return res.status(500).json(error);
  }
};

export const deletePet = async (req: Request, res: Response) => {
  const { petId } = req.params;

  try {
    const pet = await Pet.delete(petId);
    return res.json(pet);
  } catch (error) {
    return res.status(500).json({ error, message: 'Something went wrong' });
  }
};
