import React from 'react';
import { View } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import LabelList from '../../components/LabelList/LabelList';

import styles from './DatasetScreenStyles';
import Button from '../../components/Button/Button';
import Colors from '../../constants/Colors';

const DatasetScreen = () => {
  const { container, trainButton, scanToAddButton, manuallyAddButton } = styles;
  return (
    <View style={container}>
      <LabelList />
      <Button title="Model train" containerStyle={trainButton} raised />
      <Button
        icon={<FontAwesome5 name="barcode" size={26} color={Colors.primary} />}
        title="Scan to add"
        containerStyle={scanToAddButton}
        raised
      />
      <Button
        icon={<AntDesign name="pluscircleo" size={26} color={Colors.primary} />}
        title="Manually add"
        containerStyle={manuallyAddButton}
        raised
      />
    </View>
  );
};

export default DatasetScreen;
