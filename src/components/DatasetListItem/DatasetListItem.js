import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from './DatasetListItemStyles';
import Button from '../Button/Button';
import Colors from '../../constants/Colors';

const DatasetListItem = ({ dataset, navigation }) => {
  const {
    container,
    nameText,
    labelSubtitleText,
    modelSubtitleText,
    buttonsContainer,
    trainButtonStyle,
    classifyButtonStyle,
    leftContainer,
  } = styles;

  function handleDatasetPress() {
    navigation.navigate('Dataset', {
      dataset: { name: dataset.name, id: dataset.id },
    });
  }
  function handleCollectPress() {
    navigation.navigate('Camera');
  }
  function handleTrainPress() {}
  return (
    <TouchableOpacity onPress={handleDatasetPress} style={container}>
      <View style={leftContainer}>
        <Text style={nameText}>{dataset.name}</Text>
        <Text style={labelSubtitleText}>{dataset.labels.length} labels</Text>
        <Text style={modelSubtitleText}>No model found</Text>
      </View>
      <TouchableWithoutFeedback>
        <View style={buttonsContainer}>
          <Button
            onPress={handleCollectPress}
            buttonStyle={trainButtonStyle}
            title="Collect"
            icon={<Entypo name="camera" size={22} color={Colors.black} />}
          />
          <Button
            onPress={handleTrainPress}
            buttonStyle={classifyButtonStyle}
            title="Classify"
            disabled
          />
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

export default DatasetListItem;
