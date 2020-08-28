import React from 'react';
import { View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './LabelListItemPopoverStyles';
import Colors from '../../constants/Colors';

const LabelListItemPopover = () => {
  const { container, listItemContainer, titleStyle } = styles;
  function handleDeletePress() {}
  return (
    <View style={container}>
      <ListItem containerStyle={listItemContainer} onPress={handleDeletePress}>
        <FontAwesome5 name="trash" size={18} color={Colors.blackLight} />
        <ListItem.Title style={titleStyle}>Delete</ListItem.Title>
      </ListItem>
    </View>
  );
};

export default LabelListItemPopover;
