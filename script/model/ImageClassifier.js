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
  }

  addClass(id, label) {
    this.classMetadata[this.classMetadataIndex] = { id, label };
    this.mapClassIdToIndex[id] = this.classMetadataIndex;
    this.classMetadataIndex += 1;
  }

  // Initialize the KNN
  load() {
    return this.knn.load();
  }

  addImage(imageNode, classMetadataId) {
    const index = this.mapClassIdToIndex[classMetadataId];
    const imagePixelData = dl.fromPixels(imageNode);
    this.knn.addImage(imagePixelData, index);

    // TODO: Reinstate
    // imagePixelData.dispose();
  }

  getExamplesForClass(classId) {
    const classMetadataIndex = this.mapClassIdToIndex[classId];
    return this.knn.getClassExampleCount()[classMetadataIndex];
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
