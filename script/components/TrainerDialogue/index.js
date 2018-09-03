import React from 'react';
import Button from '../Button';
import { GridContainer, GridCol, GridRow } from '../Grid';
import styles from './TrainerDialogue.scss';
import * as routes from '../../routes';

export const TrainerDialogue = ({ title, children }) => (
  <GridContainer>
    <GridRow>
      {title}
    </GridRow>
    <GridCol style={{ flex: 1}} className="trainer-graphic">
      <img src="./images/trainer.jpg" />
    </GridCol>
    <GridCol style={{ flex: 3}} className="trainer-speech">
      {children}
    </GridCol>
  </GridContainer>
);

export const PrivacyNotice = () => (
  <TrainerDialogue title={<h1 className="trainer-title">Privacy</h1>}>
    <p>With your permission, I&apos;ll capture a short video to learn about
    your posture. This is <strong>totally private</strong>. The data never
    leaves your device.</p>

    <Button to={routes.TRAIN_BAD}>Enable Camera</Button>
  </TrainerDialogue>
);

export const IntroPage = () => (
  <TrainerDialogue title={<h1 className="trainer-title">I&apos;m Spotter, a physical therapy assistant.</h1>}>
    <p>Proper form is key to preventing injuries. I&apos;ll tell you when your exercise posture is incorrect. </p>
    <Button to={routes.PRIVACY}>Get Started</Button>
  </TrainerDialogue>
);

export const TrainBadDone = () => (
  <TrainerDialogue title={<h1 className="trainer-title">I&apos;ve seen worse.</h1>}>
    <p>Now let&apos;s take a look at your <strong>good</strong> form
    for the same exercise.</p>
    <Button to={routes.TRAIN_GOOD}>Continue</Button>
  </TrainerDialogue>
);

export const TrainGoodDone = () => (
  <TrainerDialogue title={<h1 className="trainer-title">Looking good!</h1>}>
    <p>I have enough data to give you tips on your posture. Ready to workout?</p>
    <Button to={routes.WORKOUT}>Start workout</Button>
  </TrainerDialogue>
);
