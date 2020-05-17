import React, { forwardRef } from 'react';
import { Tooltip } from 'react-native-elements';
import styles from './TooltipStyles';
import Colors from '../../constants/Colors';

function CustomTooltip(
  { popover, height, width, backgroundColor, withOverlay, children },
  ref,
) {
  return (
    <Tooltip
      ref={ref}
      popover={popover}
      containerStyle={styles.containerStyle}
      backgroundColor={backgroundColor || Colors.primary}
      withOverlay={withOverlay || false}
      withPointer={false}
      height={height || 80}
      width={width || 140}
      overlayColor={Colors.black}
    >
      {children}
    </Tooltip>
  );
}

export default forwardRef(CustomTooltip);
