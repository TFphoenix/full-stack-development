import { getRepository } from "typeorm";
import { Image } from "../entity/Image";
import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../common/status-codes";
import * as tf from "@tensorflow/tfjs-node";
import { MnistData } from "../util/data";
import { model, Tensor } from "@tensorflow/tfjs-node";
const path = require('path');

export class ImageController {
  private imageRepository = getRepository(Image);

  // GET/:id
  async getImageById(req: Request, res: Response, next: NextFunction): Promise<Image | null> {
    try {
      const image = await this.imageRepository.findOne(req.params.id);
      if (!image) {
        res.sendStatus(STATUS_CODES.NOT_FOUND);
      } else {
        return image;
      }
    } catch (exception) {
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }

  // GET
  async getAllImages(req: Request, res: Response, next: NextFunction): Promise<Image[] | null> {
    try {
      return await this.imageRepository.find();
    } catch (exception) {
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }

  // POST
  async saveImages(req: Request, res: Response, next: NextFunction): Promise<Image[]> {
    try {
      const body = req.body;
      return this.imageRepository.save(body);
    } catch (exception) {
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }

  // POST
  async evaluateImage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = new MnistData();
      await data.load();
      console.log('Evaluate');
      const modelPath = path.join(__dirname, '../../') + 'assets\\ml\\default\\model.json';
      const model = await tf.loadLayersModel(modelPath);
      const testData = data.nextTestBatch(1);
      const testxs = testData.xs.reshape([1, 28, 28, 1]);
      const labels = testData.labels.argMax(-1);
      const preds = model.predict(testxs);
      testxs.dispose();
      res.status(200).send(preds + "\n" + labels);
    } catch (err) {
      console.log(err);
    }
  }
}
