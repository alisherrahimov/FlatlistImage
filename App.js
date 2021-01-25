import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const picture = [
  {
    id: 1,
    img: require('./img/pexels-eberhard-grossgasteiger-1366919.jpg'),
  },
  {id: 2, img: require('./img/pexels-eberhard-grossgasteiger-2217365.jpg')},
  {id: 3, img: require('./img/pexels-guillaume-meurice-1591447.jpg')},
  {id: 4, img: require('./img/pexels-oleg-magni-2033997.jpg')},
  {id: 5, img: require('./img/solen-feyissa-ch2kda6ZSoU-unsplash.jpg')},
  {id: 6, img: require('./img/yonatan-anugerah-dNuoJTZBZo8-unsplash.jpg')},
];
const imageW = width * 0.7;
const imageH = imageW * 1.54;
const App = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  console.log(scrollX);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar hidden={true} />
      <View style={StyleSheet.absoluteFillObject}>
        {picture.map((img, index) => {
          const inputRnage = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange: inputRnage,
            outputRange: [0, 1, 0],
          });
          console.log('inputRange', inputRnage);
          console.log('Opacity', opacity);
          return (
            <Animated.Image
              key={`image-${index}`}
              source={img.img}
              style={[{opacity: opacity}, StyleSheet.absoluteFillObject]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        pagingEnabled
        keyExtractor={(_, index) => index.toString()}
        data={picture}
        renderItem={({item}) => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
              }}>
              <TouchableHighlight
                style={{
                  elevation: 20,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 5,
                    height: 10,
                  },
                  shadowRadius: 15,
                  shadowOpacity: 1,
                  borderRadius: 15,
                }}>
                <Image
                  source={item.img}
                  style={{
                    width: imageW,
                    height: imageH,
                  }}
                  borderRadius={15}
                  resizeMode="cover"
                />
              </TouchableHighlight>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default App;
