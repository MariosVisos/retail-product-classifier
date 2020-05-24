import React from 'react';
import { ListItem, Icon, Image } from 'react-native-elements';
import Tooltip from '../Tooltip/Tooltip';
import LabelListItemPopover from '../LabelListItemPopover/LabelListItemPopover';
import NoImage from '../NoImage/NoImage';
import styles from './LabelListItemStyles';
import Colors from '../../constants/Colors';

const LabelListItem = ({ navigation, label }) => {
  const { name, imageIds } = label;
  const { container } = styles;

  function handleLabelPress() {
    navigation.navigate('Label', {
      label,
    });
  }

  const dotsIconWithTooltip = (
    <Tooltip popover={<LabelListItemPopover />} withOverlay={false}>
      <Icon name="dots-three-vertical" type="entypo" color={Colors.secondary} />
    </Tooltip>
  );

  return (
    <ListItem
      containerStyle={container}
      title={name}
      subtitle={`${imageIds.length} images`}
      leftElement={
        imageIds.length > 0 ? (
          <Image
            style={{ width: 60, height: 60 }}
            source={{
              uri: `http://192.168.43.30:5000/image/${name}/${imageIds[0]}`,
            }}
          />
        ) : (
          <NoImage />
        )
      }
      rightElement={dotsIconWithTooltip}
      onPress={handleLabelPress}
    />
  );
};

export default LabelListItem;
