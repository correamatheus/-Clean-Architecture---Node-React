import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { InMemoryFamiliarRepository } from '../db/InMemoryFamiliarRepository';
import { CreateFamiliarUseCase } from '../../usecases/CreateFamiliarUseCase';
import { GetFamiliarWithDescendantsUseCase } from '../../usecases/GetFamiliarWithDescendantsUseCase';
import { HttpError } from '../../shared/HttpError';
import { FamliarController } from '../../adapters/controllers/FamiliarController';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const repo = new InMemoryFamiliarRepository();
  const createUseCase = new CreateFamiliarUseCase(repo);
  const getUseCase = new GetFamiliarWithDescendantsUseCase(repo);

  const familiarController = new FamliarController(createUseCase, getUseCase, repo);

  app.get('/health', (req: Request, res: Response) => res.json({ status: 'ok' }));

  app.use('/familiares', familiarController.router);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
      return res.status(err.status).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: 'Erro interno' });
  });

  return app;
}
