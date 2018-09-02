import { KNNImageClassifier } from 'deeplearn-knn-image-classifier';
import * as dl from 'deeplearn';

// Number of classes to classify
const NUM_CLASSES = 2;
// Webcam Image size. Must be 227.
const IMAGE_SIZE = 227;
// K value for KNN
const TOPK = 10;

export default class ImageClassifier {
  constructor(){
    // Initiate deeplearn.js math and knn classifier objects
    this.knn = new KNNImageClassifier(NUM_CLASSES, TOPK);
    this.classMetadataIndex = 0;
    this.classMetadata = {};
  }

  addClass(id, label) {
    this.classMetadata[this.classMetadataIndex] = { id, label };
    this.classMetadataIndex += 1;
  }

  // Initialize the KNN
  load() {
    return this.knn.load();
  }

  addImage(imagePixelData, classMetadataIndex) {
    return this.knn.addImage(imagePixelData, classMetadataIndex);
  }

  predict(imagePixelData, confidenceThreshold = 80) {
    const exampleCount = this.knn.getClassExampleCount();
    if (exampleCount < 1) {
      return [];
    }
    return this.knn.predictClass(image).then(res => {
      const matchedClasses = [];

      for (let i=0; i<NUM_CLASSES; i++){
        // Make the predicted class bold
        if (res.classIndex == i){
          if (res.confidences[i] * 100 >= confidenceThreshold) {
            matchedClasses.push(this.classMetadata[i]);
          }
        }
      }
      return Promise.resolve(matchedClasses);
    });
  }
}
