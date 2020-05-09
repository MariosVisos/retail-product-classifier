import React from 'react';
import { View, Text } from 'react-native';

const DatasetListItem = ({ dataset }) => {
  return (
    <View>
      <Text>{dataset.name}</Text>
    </View>
  );
};

export default DatasetListItem;
