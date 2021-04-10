import * as tf from "@tensorflow/tfjs";
import { Tensor } from "@tensorflow/tfjs";
const IMAGE_SIZE = 784;
const NUM_CLASSES = 10;
const NUM_DATASET_ELEMENTS = 65000;

const fetchAPI = require("node-fetch");
const PNGReader = require("./PNGReader");

const TRAIN_TEST_RATIO = 5 / 6;

const NUM_TRAIN_ELEMENTS = Math.floor(TRAIN_TEST_RATIO * NUM_DATASET_ELEMENTS);
const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;

const MNIST_IMAGES_SPRITE_PATH = "https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png";
const MNIST_LABELS_PATH = "https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8";

/**
 * A class that fetches the sprited MNIST dataset and returns shuffled batches.
 *
 * NOTE: This will get much easier. For now, we do data fetching and
 * manipulation manually.
 */
export class MnistData {
  shuffledTrainIndex: number;
  shuffledTestIndex: number;
  datasetImages: Float32Array;
  datasetLabels: Uint8Array;
  trainIndices: Uint32Array;
  testIndices: Uint32Array;
  trainImages: Float32Array;
  testImages: Float32Array;
  trainLabels: any;
  testLabels: any;

  constructor() {
    this.shuffledTrainIndex = 0;
    this.shuffledTestIndex = 0;
  }

  async load() {
    // Make a request for the MNIST sprited image.
    const imgRequest = fetchAPI(MNIST_IMAGES_SPRITE_PATH)
      .then((resp: { arrayBuffer: () => any }) => resp.arrayBuffer())
      .then((buffer: any) => {
        return new Promise<void>((resolve) => {
          const reader = new PNGReader(buffer);
          return reader.parse((err: any, png: any) => {
            const pixels = Float32Array.from(png.pixels).map((pixel) => {
              return pixel / 255;
            });
            this.datasetImages = pixels;
            resolve();
          });
        });
      })
      .catch((err: any) => {
        console.log(err);
      });

    const labelsRequest = fetchAPI(MNIST_LABELS_PATH);
    const [imgResponse, labelsResponse] = await Promise.all([imgRequest, labelsRequest]);

    this.datasetLabels = new Uint8Array(await labelsResponse.arrayBuffer());

    // Create shuffled indices into the train/test set for when we select a
    // random dataset element for training / validation.
    this.trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
    this.testIndices = tf.util.createShuffledIndices(NUM_TEST_ELEMENTS);

    // Slice the the images and labels into train and test sets.
    this.trainImages = this.datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
    this.testImages = this.datasetImages.slice(IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
    this.trainLabels = this.datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS);
    this.testLabels = this.datasetLabels.slice(NUM_CLASSES * NUM_TRAIN_ELEMENTS);
  }

  async loadImageBuffer(buffer) {
    // Make a request for the MNIST sprited image.
    const imgRequest =
      new Promise<void>(
        (resolve) => {
          const reader = new PNGReader(buffer);
          return reader.parse((err: any, png: any) => {
            const pixels = Float32Array.from(png.pixels).map((pixel) => {
              return pixel / 255;
            });
            this.datasetImages = pixels;
            resolve();
          });
        })
        .catch((err: any) => {
          console.log(err);
        });

    const labelsRequest = fetchAPI(MNIST_LABELS_PATH);
    const [imgResponse, labelsResponse] = await Promise.all([imgRequest, labelsRequest]);

    this.datasetLabels = new Uint8Array(await labelsResponse.arrayBuffer());

    // Create shuffled indices into the train/test set for when we select a
    // random dataset element for training / validation.
    this.trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
    this.testIndices = tf.util.createShuffledIndices(NUM_TEST_ELEMENTS);

    // Slice the the images and labels into train and test sets.
    this.trainImages = this.datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
    this.testImages = this.datasetImages.slice(IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
    this.trainLabels = this.datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS);
    this.testLabels = this.datasetLabels.slice(NUM_CLASSES * NUM_TRAIN_ELEMENTS);
  }

  public nextTrainBatch(batchSize: any) {
    return this.nextBatch(batchSize, [this.trainImages, this.trainLabels], () => {
      this.shuffledTrainIndex = (this.shuffledTrainIndex + 1) % this.trainIndices.length;
      return this.trainIndices[this.shuffledTrainIndex];
    });
  }

  public nextTestBatch(batchSize: any) {
    return this.nextBatch(batchSize, [this.testImages, this.testLabels], () => {
      this.shuffledTestIndex = (this.shuffledTestIndex + 1) % this.testIndices.length;
      return this.testIndices[this.shuffledTestIndex];
    });
  }

  public nextBatch(batchSize: any, data: any, index: any) {
    const batchImagesArray = new Float32Array(batchSize * IMAGE_SIZE);
    const batchLabelsArray = new Uint8Array(batchSize * NUM_CLASSES);

    for (let i = 0; i < batchSize; i++) {
      const idx = index();

      const image = data[0].slice(idx * IMAGE_SIZE, idx * IMAGE_SIZE + IMAGE_SIZE);
      batchImagesArray.set(image, i * IMAGE_SIZE);

      const label = data[1].slice(idx * NUM_CLASSES, idx * NUM_CLASSES + NUM_CLASSES);
      batchLabelsArray.set(label, i * NUM_CLASSES);
    }

    const xs = tf.tensor2d(batchImagesArray, [batchSize, IMAGE_SIZE]);
    const labels = tf.tensor2d(batchLabelsArray, [batchSize, NUM_CLASSES]);

    return { xs, labels };
  }
}
