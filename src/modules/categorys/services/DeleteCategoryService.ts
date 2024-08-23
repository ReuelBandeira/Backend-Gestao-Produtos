import Category from '@modules/categorys/infra/typeorm/entities/Category';
import AppError from '@shared/errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  id: number;
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private CategoryRepository: ICategoryRepository
  ) {}

  async execute({ id }: IRequest): Promise<Category> {
    const categorys = await this.CategoryRepository.findById(id);

    if (!categorys) {
      throw new AppError(`A categoria com o id: ${id} não existe.`);
    }

    await this.CategoryRepository.delete(id);

    return categorys;
  }
}
