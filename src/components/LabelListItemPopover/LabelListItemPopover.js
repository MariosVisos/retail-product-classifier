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
      <ListItem
        containerStyle={listItemContainer}
        titleStyle={titleStyle}
        title="Delete"
        leftIcon={
          <FontAwesome5 name="trash" size={22} color={Colors.blackLight} />
        }
        onPress={handleDeletePress}
      />
    </View>
  );
};

export default LabelListItemPopover;
