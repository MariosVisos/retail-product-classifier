import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import Tooltip from '../Tooltip/Tooltip';
import LabelListItemPopover from '../LabelListItemPopover/LabelListItemPopover';
import NoImage from '../NoImage/NoImage';
import styles from './LabelListItemStyles';
import Colors from '../../constants/Colors';

const LabelListItem = ({ navigation, label }) => {
  const { name, images } = label;
  const { container } = styles;
  const dotsIconWithTooltip = (
    <Tooltip popover={<LabelListItemPopover />} withOverlay={false}>
      <Icon name="dots-three-vertical" type="entypo" color={Colors.secondary} />
    </Tooltip>
  );

  return (
    <ListItem
      containerStyle={container}
      title={name}
      subtitle={`${images.length} images`}
      leftElement={images.length > 0 ? images[0] : <NoImage />}
      rightElement={dotsIconWithTooltip}
    />
  );
};

export default LabelListItem;
