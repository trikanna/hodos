import React from 'react'
import {StyleSheet, View, ScrollView, Dimensions, Text, Button, Image, Animated} from 'react-native'
import {connect} from 'react-redux';
import {currentOffsetProgress} from "../../store/actions/actions"
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import imageList from './../../assets/ImagesList'

const windowHeight = Dimensions.get('window').height

class Chapter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scalingRatio: 1
    }
    this.scrollX = new Animated.Value(0);
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  componentWillMount() {
    //Calcul scaling ratio from original height
    const sourceBackground = Image.resolveAssetSource(imageList.chapters.chap27)

    this.setState({scalingRatio: windowHeight / sourceBackground.height})
  }

  componentDidMount() {
    // Go to last OffsetX
    this.scrollView.scrollTo({x: this.props.currentOffset, animated: true})
    console.log(this.state);

  }

  _scrollViewRef = el => {
    this.scrollView = el
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView ref={this._scrollViewRef} horizontal={true} style={styles.scrollView} scrollEventThrottle={1} onScroll={ Animated.event(
          //scrollX = e.nativeEvent.contentOffset.x
          [{ nativeEvent: {
              contentOffset: {
                x: this.scrollX
              }
            }
          }]
        )}>
          <Scene src={imageList.chapters.chap27} windowHeight={windowHeight}/>
          {/* <Paragraph text={'lorem ipsum'} color={'red'} key="1" x={300} y={100} />*/}
          <ParallaxedImage x={100} y={50} scalingRatio={this.state.scalingRatio} src={imageList.chapters.palais}/>
          <ParallaxedImage x={0} y={480} width={600} src={imageList.chapters.rochers} />
          <Animated.View shouldRasterizeIOS style={{
            position: 'absolute',
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            left: 500,
            transform: [{
              translateX: this.scrollX.interpolate({
                inputRange:[0, 100],
                outputRange: [0, 50]
              })
            }
            ]
          }}>
            <Text style={{
              color:'white',
              fontSize:40,
            }}>Texte Paralax</Text>
          </Animated.View>
        </ScrollView>
        <View style={styles.absoluteContent}>
          <Button title={'< Retour'} onPress={() => this.props.navigation.goBack()}/>
          <Text style={styles.textTop}> Current offsetX : {this.props.currentOffset}</Text>
        </View>
      </View>
    )
  }

  _handleScroll = (e) => {
    console.log(e.nativeEvent)
    console.log(e.nativeEvent.contentOffset.x);
    this.props._setCurrentOffsetProgress(e.nativeEvent.contentOffset.x)

    console.log(this.scrollX);
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView: {
    height: '100%',
    width: '100%'
  },
  absoluteContent: {
    top: 50,
    left: 20,
    alignItems: 'flex-start',
    position: 'absolute',
  },
  textTop: {
    fontSize: 30,
    color: 'white'
  }
})

const mapStateToProps = state => {
  console.log(state);
  return {
    currentOffset: state.progress.currentOffset
  }
}

const mapDispatchToProps = dispatch => {
  return {
    _setCurrentOffsetProgress: (currentOffset) => {
      dispatch(currentOffsetProgress(currentOffset))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chapter)
