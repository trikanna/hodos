import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, View, Dimensions, Text, Button, Image, Animated} from 'react-native'
import {fonts} from './../../assets/variables'

const windowHeight = Dimensions.get('window').height

export default class Paragraph extends React.Component {

  static propTypes = {
    text: PropType.string.isRequired,
    styles: PropType.object,
    scrollX: PropType.any.isRequired,
    parentWidth: PropType.number.isRequired,
    animationOpacityValues: PropType.array
  }

  static defaultProps = {
    animationOpacityValues: [0.9, 0.7, 0.3, 0.1, 1]
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: this.props.styles
    }
  }

  _ParagraphView(el) {
    this.el = el
  }

  componentWillReceiveProps (nextProp) {
    if (this.props.parentWidth !== nextProp.parentWidth) {
      this.setState({
        styles: {
          ...this.props.styles,
          left:  (nextProp.parentWidth * nextProp.styles.left) / 100,
          width: (nextProp.parentWidth * nextProp.styles.width) / 100,
        }
      })
    }
  }

  render () {
    const { animationOpacityValues, windowWidth } = this.props
    const { left } = this.state.styles
    const middle = left + (this.state.styles.width / 2)
    const range =  [
      middle - windowWidth,
      middle - windowWidth * animationOpacityValues[0],
      middle - windowWidth * animationOpacityValues[1],
      middle - windowWidth * animationOpacityValues[2],
      middle - windowWidth * animationOpacityValues[3],
      middle + windowWidth * animationOpacityValues[4],
    ]
    return (
      <Animated.View ref={this._ParagraphView()} style={[
        this.state.styles,
        styles.textWrapper,
        {
          opacity: this.props.scrollX.interpolate({
            inputRange: range,
            outputRange: [0, 0, 1, 1, 1, 1],
          }),
          transform: [
            {
              translateY: this.props.scrollX.interpolate({
                inputRange: range,
                outputRange: [ 35, 35, 0, 0, 0, 0],
              })
            }
          ]
        },
      ]}
        >
        <Text style={styles.text}> {this.props.text}</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  textWrapper: {
    position: 'absolute',
    zIndex: 200
  },
  text: {
    color: '#fff',
    fontFamily: fonts.RubikRegular,
    fontSize: 22,
    lineHeight: 32
  }
})
