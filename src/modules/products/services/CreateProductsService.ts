// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Products';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
  expirationDate: string;
  image: string;
  categoryId: number;
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository
  ) {}

  async execute({
    name,
    description,
    price,
    expirationDate,
    image,
    categoryId,
  }: IRequest): Promise<Product> {
    const checkProductExist = await this.productsRepository.findByName(name);

    if (checkProductExist) {
      throw new AppError(`Esse produto já existe`);
    }

    // Verifica se o preço é positivo
    if (price <= 0) {
      throw new AppError('O preço deve ser um valor positivo.');
    }

    const expDate = new Date(`${expirationDate}T00:00:00`);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const expirationDateString = expDate.toLocaleDateString('en-CA');
    const currentDateString = currentDate.toLocaleDateString('en-CA');

    const validationDate = expirationDateString >= currentDateString;

    if (!validationDate) {
      throw new AppError(
        'A data de validade não pode ser anterior à data atual.'
      );
    }

    const products = await this.productsRepository.create({
      name,
      description,
      price,
      expirationDate,
      image,
      categoryId,
    });

    return products;
  }
}
