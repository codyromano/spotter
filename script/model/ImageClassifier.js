import { KNNImageClassifier } from 'deeplearn-knn-image-classifier';
import * as dl from 'deeplearn';

// Number of classes to classify
const NUM_CLASSES = 2;
// K value for KNN
const TOPK = 10;

export default class ImageClassifier {
  constructor(){
    // Initiate deeplearn.js math and knn classifier objects
    this.knn = new KNNImageClassifier(NUM_CLASSES, TOPK);
    this.classMetadataIndex = 0;
    this.classMetadata = {};
    this.mapClassIdToIndex = {};
    this.examples = 0;

    this.addImageStack = [];
    this.imageStackProcessing = false;
    this.imageStackProcessInterval = 1000;
    this.imageStackBatchLimit = 10;

    this.processImageStack = this.processImageStack.bind(this);
    this.imageStackCount = {};
  }

  addClass(id, label) {
    this.imageStackCount[id] = 0;
    this.classMetadata[this.classMetadataIndex] = { id, label };
    this.mapClassIdToIndex[id] = this.classMetadataIndex;
    this.classMetadataIndex += 1;
  }

  // Initialize the KNN
  load() {
    return this.knn.load();
  }

  addImage(imageNode, classMetadataId) {
    this.examples += 1;
    this.imageStackCount[classMetadataId] = ++this.imageStackCount[classMetadataId];

    const index = this.mapClassIdToIndex[classMetadataId];
    const imagePixelData = dl.fromPixels(imageNode);
    // this.knn.addImage(imagePixelData, index);
    this.addImageStack.push({
      imagePixelData,
      index
    })

    if (!this.imageStackProcessing) {
      this.imageStackProcessing = true;
      this.processImageStack();
    }
  }

  processImageStack() {
    let limit = 0;
    while (this.addImageStack.length && limit < this.imageStackBatchLimit) {
      const { imagePixelData, index } = this.addImageStack.pop();
      this.knn.addImage(imagePixelData, index);
      imagePixelData.dispose();
      limit += 1;
    }

    if (this.addImageStack.length) {
      window.setTimeout(this.processImageStack, this.imageStackProcessInterval);
    } else {
      this.imageStackProcessing = false;
    }
  }

  getExamplesForClass(classId) {
    return this.imageStackCount[classId];
    /*
    const classMetadataIndex = this.mapClassIdToIndex[classId];
    return this.knn.getClassExampleCount()[classMetadataIndex];
    */
  }

  // TODO: async / await
  predict(imageNode, confidenceThreshold = 80) {
    const imagePixelData = dl.fromPixels(imageNode);
    if (!this.examples) {
      return Promise.resolve([]);
    }
    let match = null;

    return this.knn.predictClass(imagePixelData).then(res => {
      for (let i=0; i<NUM_CLASSES; i++){
        // Make the predicted class bold
        if (res.classIndex == i){
          if (res.confidences[i] * 100 >= confidenceThreshold) {
            match = {
              classId: this.classMetadata[i].id,
              confidence: res.confidences[i]
            };
            break;
          }
        }
      }
    }).then(() => {
      imagePixelData.dispose();
      return Promise.resolve(match);
    });
  }
}
