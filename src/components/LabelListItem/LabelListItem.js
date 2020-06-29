import React from 'react';
import { ListItem, Icon, Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import Tooltip from '../ui/Tooltip/Tooltip';
import LabelListItemPopover from '../LabelListItemPopover/LabelListItemPopover';
import NoImage from '../NoImage/NoImage';
import styles from './LabelListItemStyles';
import Colors from '../../constants/Colors';
import { baseUrl } from '../../constants/api';

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
              uri: `${baseUrl}/image/${name}/${imageIds[0]}`,
            }}
            PlaceholderContent={<ActivityIndicator color={Colors.secondary} />}
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
