import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from './DatasetListItemStyles';
import Button from '../ui/Button/Button';
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
    nameContainer,
  } = styles;

  function handleDatasetPress() {
    navigation.navigate('Dataset', {
      dataset,
    });
  }
  function handleCollectPress() {
    navigation.navigate('Camera', { dataset });
  }
  function handleTrainPress() {}
  return (
    <TouchableOpacity onPress={handleDatasetPress} style={container}>
      <View style={leftContainer}>
        <View style={nameContainer}>
          <Text style={nameText}>{dataset.name}</Text>
        </View>

        <Text style={labelSubtitleText}>
          {dataset.labelIds.length} products
        </Text>
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
