import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './DatasetListItemStyles';
import Button from '../Button/Button';

const DatasetListItem = ({ dataset }) => {
  const {
    container,
    nameText,
    labelSubtitleText,
    modelSubtitleText,
    buttonsContainer,
    trainButtonStyle,
    classifyButtonStyle,
  } = styles;
  function handleTrainPress() {}
  return (
    <TouchableOpacity style={container}>
      <View>
        <Text style={nameText}>{dataset.name}</Text>
        <Text style={labelSubtitleText}>{dataset.labels.length} labels</Text>
        <Text style={modelSubtitleText}>Model found</Text>
      </View>
      <TouchableWithoutFeedback>
        <View style={buttonsContainer}>
          <Button
            onPress={handleTrainPress}
            buttonStyle={trainButtonStyle}
            title="Train"
          />
          <Button
            onPress={handleTrainPress}
            buttonStyle={classifyButtonStyle}
            title="Classify"
          />
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

export default DatasetListItem;
