import AppError from '@shared/errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  name: string;
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private CategoryRepository: ICategoryRepository
  ) {}

  async execute({ name }: IRequest): Promise<Category> {
    const checkDescriptionExist = await this.CategoryRepository.findByName(
      name
    );

    if (checkDescriptionExist) {
      throw new AppError(`Essa categoria já existe`);
    }

    const categorys = await this.CategoryRepository.create({
      name,
    });

    return categorys;
  }
}
