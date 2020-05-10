import React, { useEffect } from 'react';
import { FlatList, Text, View, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DatasetListItem from '../DatasetListItem/DatasetListItem';
import { datasetsRefresh } from '../../store/actions/entity';
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
    dispatch(datasetsRefresh());
  }, [dispatch]);

  function handleRefresh() {
    dispatch(datasetsRefresh());
  }

  function navigateToCameraScreen() {
    navigation.navigate('Camera');
  }

  const emptyList = (
    <View>
      <Text>Create new shelve</Text>
    </View>
  );

  const header = (
    <View style={headerContainer}>
      <Text style={headerText}>{datasets.length} Shelves</Text>
    </View>
  );

  const footer = <View style={footerContainer} />;
  return (
    <FlatList
      data={datasets}
      renderItem={({ item }) => (
        <DatasetListItem
          dataset={item}
          onCollectPress={navigateToCameraScreen}
        />
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
