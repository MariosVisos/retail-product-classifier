import React from 'react';
import { View } from 'react-native';
import { ListItem, Icon, Image } from 'react-native-elements';
import Tooltip from '../ui/Tooltip/Tooltip';
import NoImage from '../NoImage/NoImage';
import styles from './ImageListItemStyles';
import Colors from '../../constants/Colors';

const ImageListItem = ({ navigation, image }) => {
  const { container } = styles;

  return (
    <View>
      <Image />
    </View>
  );
};

export default ImageListItem;
