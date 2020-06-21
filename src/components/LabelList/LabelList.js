import React, { useEffect } from 'react';
import { FlatList, Text, View, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LabelListItem from '../LabelListItem/LabelListItem';
import { entityRefresh } from '../../store/actions/entity';
import styles from './LabelListStyles';
import Colors from '../../constants/Colors';

const LabelList = ({ navigation, relationshipEntity }) => {
  const { footerContainer, headerContainer, headerText } = styles;

  const labels = useSelector(state => {
    const { labelIds } = state.entity.dataset.byId[relationshipEntity.id];
    const { byId } = state.entity.label;
    const labelsArray = [];
    labelIds.forEach(labelId => {
      const label = byId[labelId];
      if (label) {
        labelsArray.push(label);
      }
    });
    return labelsArray;
  });

  const refreshing = useSelector(state => state.entity.label.refreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(entityRefresh('label', relationshipEntity));
  }, [dispatch, relationshipEntity]);

  function handleRefresh() {
    dispatch(entityRefresh('label', relationshipEntity));
  }

  const emptyList = (
    <View>
      <Text>Create new product</Text>
    </View>
  );

  const header = (
    <View style={headerContainer}>
      <Text style={headerText}>
        {labels.length} Product{labels.length !== 1 && 's'}
      </Text>
    </View>
  );

  const footer = <View style={footerContainer} />;
  return (
    <FlatList
      data={labels}
      renderItem={({ item }) => (
        <LabelListItem label={item} navigation={navigation} />
      )}
      keyExtractor={label => label.id.toString()}
      ListEmptyComponent={emptyList}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={[Colors.secondary]}
          tintColor={Colors.secondary}
          progressBackgroundColor={Colors.primary}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    />
  );
};

export default LabelList;
