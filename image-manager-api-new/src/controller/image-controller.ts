import { getRepository } from 'typeorm';
import { Image } from '../entity/Image';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../shared/status-codes';

export class ImageController {
  private imageRepository = getRepository(Image);

  // GET/:id
  async getImageById(imageId: number): Promise<Image | null> {
    return await this.imageRepository.findOne({ id: imageId });
  }

  // GET
  async getAllImages(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Image[] | null> {
    try {
      return this.imageRepository.find();
    } catch (exception) {
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }

  // POST
  async saveImages(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Image[]> {
    try {
      const body = req.body;
      return this.imageRepository.save(body);
    } catch (exception) {
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }

  async evaluateImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
    } catch (exception) {
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }
}
