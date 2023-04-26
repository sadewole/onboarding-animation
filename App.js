import * as React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Easing,
} from 'react-native';
const { width, height } = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: require('./assets/hob.png'),
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: require('./assets/frying-pan.png'),
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: require('./assets/tap.png'),
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: require('./assets/toaster.png'),
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row' }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              margin: 10,
              opacity,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height,
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        backgroundColor: '#fff',
        transform: [{ rotate }, { translateX }],
      }}
    />
  );
};

export default function App() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  const handleOnViewableItemsChanged = React.useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        pagingEnabled
        onViewableItemsChanged={handleOnViewableItemsChanged}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => (
          <View style={{ width, alignItems: 'center' }}>
            <View style={{ flex: 0.7, justifyContent: 'center' }}>
              <Animated.Image
                source={item.image}
                style={{
                  width: width / 2,
                  height: height / 2,
                  resizeMode: 'contain',
                  transform: [
                    {
                      translateY: currentIndex === index ? translateYImage : 40,
                    },
                  ],
                }}
              />
            </View>
            <View style={{ flex: 0.3 }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: 28,
                  marginBottom: 10,
                }}
              >
                {item.title}
              </Text>
              <Text style={{ color: '#fff', fontWeight: '300' }}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
