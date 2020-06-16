import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const progressBarBaseStyle = {
  alignItems: 'center',
  borderColor: Colors.secondaryDark,
  borderWidth: 0.6,
  borderRadius: 8,
  backgroundColor: Colors.secondary,
  height: 20,
  width: 80,
};
const stepTextBaseStyle = { color: Colors.secondary };

const styles = StyleSheet.create({
  activeStepContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: -2,
    padding: 2,
  },
  container: {
    backgroundColor: Colors.getColorOpacity(Colors.black, 0.4),
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    paddingVertical: 6,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  currentStepText: { ...stepTextBaseStyle },
  filledProgressBarContainer: progressBarBaseStyle,

  filledStepText: { ...stepTextBaseStyle, color: Colors.primary },
  progressBarContainer: {
    ...progressBarBaseStyle,
    backgroundColor: Colors.primary,
  },
  stepText: { ...stepTextBaseStyle },
});

export default styles;
