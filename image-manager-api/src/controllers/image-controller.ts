import { getRepository } from "typeorm";
import { Image } from "../entities/Image";
import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../common/status-codes";
import * as tf from "@tensorflow/tfjs-node";
import { MnistData } from "../utils/data";
import { getModel, train } from "../utils/ml";
const path = require('path');

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
      console.log('Evaluate');
      const modelPath = 'file://' + path.join(__dirname, '../../') + 'assets\\ml\\default\\model.json';
      console.log(modelPath);
      const model = await tf.loadLayersModel(
        modelPath
      );
      const testData = data.nextTestBatch(1);
      const testxs = testData.xs.reshape([1, 28, 28, 1]);
      const label = testData.labels.argMax(-1);
      const probabilities = model.predict(testxs);
      testxs.dispose();
      res.status(STATUS_CODES.OK).send(`Class probabilities: ${probabilities}\nLabel: ${label}`);
    } catch (err) {
      console.log(err);
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }

  // POST images/train
  async trainImage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = new MnistData();
      await data.load();
      const model = getModel();
      let trainResults;
      await train(model, data).then((results) => {
        console.log("TRAIN FINISHED");
        console.log(results);
        trainResults = results;
      });

      const modelPath = 'file://' + path.join(__dirname, '../../') + 'assets\\ml\\trained\\model.json';
      console.log(modelPath);

      model.save(
        modelPath
      );
      res.status(STATUS_CODES.OK).send(trainResults);
    } catch (err) {
      console.log(err);
      res.sendStatus(STATUS_CODES.SERVER_ERROR);
    }
  }
}
