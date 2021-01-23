import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';

import ownerRoutes from './routes/ownerRoutes';
import petRoutes from './routes/petRoutes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('hello'));
app.use('/api/v1/owners', ownerRoutes);
app.use('/api/v1/pets', petRoutes);

app.listen(5000, async () => {
  console.log(`Server running at http://localhost:5000`);
  try {
    await createConnection();
    console.log(`Database Connected!`);
  } catch (error) {
    console.log(error);
  }
});
