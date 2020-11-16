import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

interface Response {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: Request): Promise<Response> {
        const Repository = getCustomRepository(UsersRepository);

        const checkUserExists = await Repository.findByEmail(email);

        if (checkUserExists) {
            throw Error('this email already registered');
        }

        const hashedPassword = await hash(password, 8);

        const user = Repository.create({
            name,
            email,
            password: hashedPassword,
        });

        await Repository.save(user);

        return this.sanitizeResponse(user);
    }

    private sanitizeResponse(data: User): Response {
        const dataSanitized: Response = {
            id: data.id,
            email: data.email,
            name: data.name,
            created_at: data.created_at,
            updated_at: data.updated_at,
        };

        return dataSanitized;
    }
}

export default CreateUserService;
