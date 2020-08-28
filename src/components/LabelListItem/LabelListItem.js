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
  const { id, name, imageIds } = label;
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
    <ListItem containerStyle={container} onPress={handleLabelPress}>
      {imageIds.length > 0 ? (
        <Image
          style={{ width: 60, height: 60 }}
          source={{
            uri: `${baseUrl}/image/${id}/${imageIds[0]}`,
          }}
          PlaceholderContent={<ActivityIndicator color={Colors.secondary} />}
        />
      ) : (
        <NoImage />
      )}
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{`${imageIds.length} images`}</ListItem.Subtitle>
      </ListItem.Content>
      {dotsIconWithTooltip}
    </ListItem>
  );
};

export default LabelListItem;
