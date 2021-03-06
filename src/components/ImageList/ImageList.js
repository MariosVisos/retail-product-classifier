import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { entityRefresh } from '../../store/actions/entity';
import styles from './ImageListStyles';
import Colors from '../../constants/Colors';
import { baseUrl } from '../../constants/api';

const windowWidth = Dimensions.get('window').width;

const edgeWidth = (windowWidth - 12) / 3;

const ImageList = ({ navigation, relationshipEntity }) => {
  const { footerContainer, headerContainer, headerText } = styles;

  const images = useSelector(state => {
    const { imageIds } = state.entity.label.byId[relationshipEntity.id];
    const { byId } = state.entity.image;
    const imagesArray = [];
    imageIds.forEach(labelId => {
      const label = byId[labelId];
      if (label) {
        imagesArray.push(label);
      }
    });
    return imagesArray;
  });

  const refreshing = useSelector(state => state.entity.image.refreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(entityRefresh('image', relationshipEntity));
  }, [dispatch, relationshipEntity]);

  function handleRefresh() {
    dispatch(entityRefresh('image', relationshipEntity));
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
        // const name = relationshipEntity.name.split(' ').join('%20');
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('Image', { imageId: item.id })}
          >
            <Image
              style={{ width: edgeWidth, height: edgeWidth, margin: 2 }}
              source={{
                uri: `${baseUrl}/image/${relationshipEntity.id}/${item.id}`,
              }}
              PlaceholderContent={
                <ActivityIndicator color={Colors.secondary} />
              }
            />
          </TouchableOpacity>
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
