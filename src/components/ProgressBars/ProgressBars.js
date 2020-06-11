import React from 'react';
import { View, Text } from 'react-native';
import styles from './ProgressBarsStyles';

const {
  container,
  filledProgressBarContainer,
  progressBarContainer,
  stepText,
  filledStepText,
  activeStepContainer,
} = styles;

function ProgressBars({ currentStep, totalSteps }) {
  const progressBars = [];
  const progressBarWidth = 200;

  for (let i = 0; i < totalSteps; i += 1) {
    let progressBarStyle = progressBarContainer;
    let stepTextStyle = stepText;
    if (i < currentStep) {
      progressBarStyle = filledProgressBarContainer;
      stepTextStyle = filledStepText;
    }
    const progressBar =
      currentStep === i + 1 ? (
        <View key={i} style={activeStepContainer}>
          <View style={[progressBarStyle, { progressBarWidth }]}>
            <Text style={stepTextStyle}>{i + 1}</Text>
          </View>
        </View>
      ) : (
        <View key={i} style={[progressBarStyle, { progressBarWidth }]}>
          <Text style={stepTextStyle}>{i + 1}</Text>
        </View>
      );
    progressBars.push(progressBar);
  }

  return <View style={container}>{progressBars}</View>;
}
export default ProgressBars;
