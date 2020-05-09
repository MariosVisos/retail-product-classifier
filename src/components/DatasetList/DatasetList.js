import React, { useEffect } from 'react';
import { FlatList, Text, View, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DatasetListItem from '../DatasetListItem/DatasetListItem';
import { datasetsRefresh } from '../../store/actions/entity';
import Colors from '../../constants/Colors';

const DatasetList = () => {
  const datasets = useSelector(state => {
    const { byId } = state.entity.dataset;
    const datasetsArray = Object.values(byId);
    return datasetsArray;
  });

  const refreshing = useSelector(state => state.entity.dataset.refreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('DatasetList -> useEffect', datasetsRefresh);
    dispatch(datasetsRefresh());
  }, [dispatch]);

  function handleRefresh() {
    dispatch(datasetsRefresh());
  }

  const emptyList = (
    <View>
      <Text>Create new shelve</Text>
    </View>
  );

  const header = (
    <View>
      <Text>Shelves</Text>
    </View>
  );
  return (
    <View>
      <FlatList
        data={datasets}
        renderItem={({ item }) => <DatasetListItem dataset={item} />}
        keyExtractor={dataset => dataset.id.toString()}
        ListEmptyComponent={emptyList}
        ListHeaderComponent={header}
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
    </View>
  );
};

export default DatasetList;
