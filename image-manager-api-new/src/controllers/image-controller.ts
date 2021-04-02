import { getRepository } from "typeorm";
import { Image } from "../entities/Image";
import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../common/status-codes";
import * as tf from "@tensorflow/tfjs-node";
import { MnistData } from "../utils/data";
import { getModel, train } from "../utils/ml";

export class ImageController {
  private imageRepository = getRepository(Image);

  // GET images/:id
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

  // GET images
  async getAllImages(req: Request, res: Response, next: NextFunction): Promise<Image[] | null> {
    try {
      return await this.imageRepository.find();
    } catch (exception) {
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }

  // POST images
  async saveImages(req: Request, res: Response, next: NextFunction): Promise<Image[]> {
    try {
      const body = req.body;
      return this.imageRepository.save(body);
    } catch (exception) {
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }

  // POST images/evaluate
  async evaluateImage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = new MnistData();
      await data.load();
      const model = await tf.loadLayersModel(
        "file://D:/OneDrive/Programming Projects/University/FSD - Full Stack Development/full-stack-development/image-manager-api-new/assets/ml/default/model.json"
      );
      const testData = data.nextTestBatch(1);
      const testxs = testData.xs.reshape([1, 28, 28, 1]);
      const labels = testData.labels.argMax(-1);
      const preds = model.predict(testxs);
      testxs.dispose();
      res.status(STATUS_CODES.OK).send(preds + "\n" + labels);
    } catch (err) {
      console.log(err);
    }
  }

  // POST images/train
  async trainImage(req: Request, res: Response, next: NextFunction) {
    const data = new MnistData();
    await data.load();
    const model = getModel();
    await train(model, data);
    model.save(
      "file://D:/OneDrive/Programming Projects/University/FSD - Full Stack Development/full-stack-development/image-manager-api-new/assets/ml/trained/model.json"
    );
    res.send(STATUS_CODES.OK);
  }
}
