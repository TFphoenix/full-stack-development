import { getRepository } from 'typeorm';
import { ImageDetails } from '../entity/ImageDetails';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../shared/status-codes';

export class EvaluationController {
  private imageRepository = getRepository(ImageDetails);

  // GET/:id
  async getImageById(imageId: number): Promise<ImageDetails | null> {
    return await this.imageRepository.findOne({ id: imageId });
  }

  // GET
  async getAllImages(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ImageDetails[] | null> {
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
  ): Promise<ImageDetails[]> {
    try {
      const body = req.body;
      return this.imageRepository.save(body);
    } catch (exception) {
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }
}
