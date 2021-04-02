import { getRepository } from "typeorm";
import { Image } from "../entity/Image";
import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../shared/status-codes";

export class ImageController {
  private imageRepository = getRepository(Image);

  // GET/:id
  async getImageById(imageId: number): Promise<Image | null> {
    return await this.imageRepository.findOne({ id: imageId });
  }

  // GET
  async getAllImages(req: Request, res: Response, next: NextFunction): Promise<Image[] | null> {
    try {
      return this.imageRepository.find();
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

  // evaluate image
  async evaluateImage(req: Request, res: Response, next: NextFunction) {
    // try {
    //   const data = new MnistData();
    //   await data.load();
    //   const model = await tf.loadLayersModel('file://D:/Facultate/Anul 3 Semestrul II/Fac/Fullstak/source/fullstackdevapp/backend/mlModel/myTrainedModel/model.json');
    //   const testData = data.nextTestBatch(1);
    //   const testxs = testData.xs.reshape([1, 28, 28, 1]);
    //   const labels = testData.labels.argMax(-1);
    //   const preds = model.predict(testxs);
    //   testxs.dispose();
    //   res.status(200).send(preds + "\n" + labels);
    // } catch (err) {
    //   console.log(err);
    // }
  }
}
