import React, { useEffect } from 'react';
import { FlatList, Text, View, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DatasetListItem from '../DatasetListItem/DatasetListItem';
import { entityRefresh } from '../../store/actions/entity';
import styles from './DatasetListStyles';
import Colors from '../../constants/Colors';

const DatasetList = ({ navigation }) => {
  const { footerContainer, headerContainer, headerText } = styles;
  const datasets = useSelector(state => {
    const { byId } = state.entity.dataset;
    const datasetsArray = Object.values(byId);
    return datasetsArray;
  });

  const refreshing = useSelector(state => state.entity.dataset.refreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(entityRefresh({ entityType: 'dataset' }));
  }, [dispatch]);

  function handleRefresh() {
    dispatch(entityRefresh({ entityType: 'dataset' }));
  }

  const emptyList = (
    <View>
      <Text>Create new shelf</Text>
    </View>
  );

  const header = (
    <View style={headerContainer}>
      <Text style={headerText}>
        {datasets.length} Shelve{datasets.length !== 1 && 's'}
      </Text>
    </View>
  );

  const footer = <View style={footerContainer} />;
  return (
    <FlatList
      data={datasets}
      renderItem={({ item }) => (
        <DatasetListItem dataset={item} navigation={navigation} />
      )}
      keyExtractor={dataset => dataset.id.toString()}
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

export default DatasetList;
