import { Request, Response, NextFunction } from "express";
import { IFamiliarRepository } from "../../ports/IFamiliarRepository";
import { CreateFamiliarUseCase } from "../../usecases/CreateFamiliarUseCase";
import { GetFamiliarWithDescendantsUseCase } from "../../usecases/GetFamiliarWithDescendantsUseCase";
import { createFamiliarSchema } from "../validators/familiarSchema";
import { HttpError } from "../../shared/HttpError";

export class FamliarController {
    public router = require('express').Router();
    constructor(
        private createUseCase: CreateFamiliarUseCase,
        private getUseCase: GetFamiliarWithDescendantsUseCase,
        private repository: IFamiliarRepository
    ){
        this.router.post('/', this.create.bind(this));
        this.router.get('/', this.list.bind(this));
        this.router.get('/:id', this.getById.bind(this));
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {
            const parse = createFamiliarSchema.safeParse(req.body);
            if(!parse.success){
                const errorMessages = parse.error.issues.map(issue => issue.message);
                throw new HttpError(400, JSON.stringify(errorMessages));
            }
            const dto = parse.data;
            const result = await this.createUseCase.execute(dto);
            return res.status(201).json(result.toJSON());
        }catch(err){
            next(err);
        }
    }

    async list(req: Request, res:Response, next: NextFunction){
        try {
            const result = await this.repository.findAll();
            return res.json(result.map((f) => f.toJSON()))
        }catch(err) {
            next(err);
        }
    }
    async getById(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params.id;
            const result = await this.getUseCase.execute(id);
            if (!result) {
                return res.status(404).json({ message: 'Familiar não encontrado' });
            }
            return res.json({
                familiar: result.familiar.toJSON(),
                descendentes: result.descendentes.map((d) => d.toJSON())
            });
        }catch(err){
            next(err)
        }
    }
}