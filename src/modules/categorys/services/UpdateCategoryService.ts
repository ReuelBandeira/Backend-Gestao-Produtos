/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  id: number;
  name: string;
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private CategoryRepository: ICategoryRepository
  ) {}

  async execute({ id, name }: IRequest): Promise<Category> {
    const categorys = await this.CategoryRepository.findById(id);

    if (!categorys) {
      throw new AppError(`Está categoria: ${id} não existe`);
    }

    Object.assign(categorys, {
      name,
    });

    await this.CategoryRepository.update(categorys);

    return categorys;
  }
}
