export interface IPet {
  PetID: number;
  PetName: string;
  PetType: string;
  PetBreed: string;
  PetBdate: Date;
  PetGender: string;
  PetNotes: string;
  PetOwnerID: IOwner;
  IsActive: string;
}

export interface IOwner {
  OwnerId: number;
  OwnerName: string;
  OwnerAddress: string;
  OwnerCity: string;
  OwnerZip: string;
  OwnerMobileNo: string;
  OwnerEmail: string;
  IsActive: string;
  OwnerPets: IPet[];
}
