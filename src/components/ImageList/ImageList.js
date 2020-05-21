import React, { useEffect } from 'react';
import { FlatList, Text, View, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-native-elements';
import { entityRefresh } from '../../store/actions/entity';
import styles from './ImageListStyles';
import Colors from '../../constants/Colors';

const ImageList = ({ navigation, label }) => {
  const { footerContainer, headerContainer, headerText } = styles;
  const { images } = label;

  const refreshing = useSelector(state => state.entity.image.refreshing);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(entityRefresh({ entityType: 'image' }));
  // }, [dispatch]);

  function handleRefresh() {
    dispatch(entityRefresh({ entityType: 'image' }));
  }

  const emptyList = (
    <View>
      <Text>Create new image</Text>
    </View>
  );

  const header = (
    <View style={headerContainer}>
      <Text style={headerText}>
        {images.length} Image{images.length !== 1 && 's'}
      </Text>
    </View>
  );

  const footer = <View style={footerContainer} />;
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => {
        return (
          <Image
            style={{ width: 120, height: 120, margin: 2 }}
            source={{
              uri: `http://192.168.43.30:5000/image/${item.name}`,
            }}
          />
        );
      }}
      keyExtractor={image => image.id.toString()}
      ListEmptyComponent={emptyList}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      showsVerticalScrollIndicator={false}
      numColumns={3}
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

export default ImageList;