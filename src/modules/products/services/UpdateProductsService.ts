/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Products';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: number;
  name: string;
  description: string;
  price: number;
  expirationDate: Date;
  image?: string; // Agora é opcional
  categoryId: number;
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute({
    id,
    name,
    description,
    price,
    expirationDate,
    image,
    categoryId,
  }: IRequest): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError(`Este registro: ${id} não existe`);
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

    Object.assign(product, {
      name,
      description,
      price,
      expirationDate,
      image: image || product.image,
      categoryId,
    });

    await this.productRepository.update(product);

    return product;
  }
}
