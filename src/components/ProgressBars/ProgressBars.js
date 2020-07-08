import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styles from './ProgressBarsStyles';

const {
  container,
  filledProgressBarContainer,
  progressBarContainer,
  stepText,
  filledStepText,
  activeStepContainer,
} = styles;

const windowWidth = Dimensions.get('window').width;

function ProgressBars({ currentStep, totalSteps }) {
  const progressBars = [];
  const progressBarWidth = (windowWidth - 48) / totalSteps;

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
          <View style={[progressBarStyle, { width: progressBarWidth }]}>
            <Text style={stepTextStyle}>{i + 1}</Text>
          </View>
        </View>
      ) : (
        <View key={i} style={[progressBarStyle, { width: progressBarWidth }]}>
          <Text style={stepTextStyle}>{i + 1}</Text>
        </View>
      );
    progressBars.push(progressBar);
  }

  return <View style={container}>{progressBars}</View>;
}
export default ProgressBars;
