import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated, ScrollView } from 'react-native'
import PropType from 'prop-types'
import {fonts, colors} from './../../assets/variables'
import HeaderPlace from './../Map/HeaderPlace'
import PlaceCard from './PlaceCard'
import Title from './../Title'
import ButtonWhite from './../ButtonWhite'
import imageList from './../../assets/ImagesList'

export default class Place extends React.Component {

  static propTypes = {
    onBackToMap: PropType.func,
    onReading: PropType.func
  }

  static defaultProps = {
    id: null
  }


  constructor(props) {
    super(props)
    this.state = {
      place: {
        name: ' '
      }
    }
  }

  _handleBackToMap = () => {
    this.props.onBackToMap()
  }

  _handleReading = () => {
    this.props.onReading()
  }

  _renderTabHeader() {
    return (
      <View style={[styles.placeHeaderWrapper]}>
        <View style={styles.buttonLeft} src={imageList.others.arrowLeft}>
          <ButtonWhite text={'Retour au plan'} hasImage={true} imageLeft={true} onTouch={this._handleBackToMap}/>
        </View>
        <View style={styles.buttonRight} src={imageList.others.arrowRight}>
          <ButtonWhite text={'Reprendre la lecture'} hasImage={true} imageLeft={false} onTouch={this._handleReading} />
        </View>
        <Title title={this.props.place.name} subTitle={this.props.place.description} style={styles.placeHeader} />
        {/* <View style={styles.placeTabs}>
          <TouchableHighlight onPress={this._handleTabChange} underlayColor='transparent'  style={[
            styles.placeTab,
            this.state.tab ? styles.placeActiveTab: styles.placeUnactiveTab]}>
            <Text style={[
              styles.placeTabTitle,
              this.state.tab ? styles.placeActiveTabTitle : styles.placeUnactiveTabTitle]}>Chapitres</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._handleTabChange} underlayColor='transparent'  style={[
            styles.placeTab,
            !this.state.tab ? styles.placeActiveTab : styles.placeUnactiveTab]}>
            <Text style={[styles.placeTabTitle,
              !this.state.tab ? styles.placeActiveTabTitle : styles.placeUnactiveTabTitle]}>Personnages</Text>
          </TouchableHighlight>
        </View> */}
      </View>
    )
  }

  _renderChapterList() {
    const chapterList = [
      {name: 'Chapitre XX', description: 'Où Hermès découvre le palais de son père', numberInt: '27'},
      {name: 'Chapitre IV', description: 'Où Hermès rencontre Zeus, son père', numberInt: '27'},
      {name: 'Chapitre XXV', description: 'Où Hermès découvre qu’il peut voler', numberInt: '27'},
      {name: 'Chapitre XV', description: 'Où Hermès découvre qu’il peut voler', numberInt: '27'}
    ]
    return chapterList.map(function(chapter, index) {
      return (
        <View key={index} style={[styles.listElement]}>
          <View style={[styles.listThumbnailWrapper,  styles.listChapterThumbnailWrapper]}>
            <Image source={imageList.chapters['chapter'+chapter.numberInt].thumbnail} style={[styles.listChapterThumbnailWrapper, styles.listThumbnail]} />
          </View>
          <Text style={[styles.listSubTitle]}>{chapter.name}</Text>
          <Text style={styles.listDescription}>{chapter.description}</Text>
        </View>
      )
    })
  }

  _renderCharacterList() {
    const charactersList = ['Hermes', 'Cronos', 'Hadès']
    return charactersList.map(function(character, index) {
      return (
        <View key={index} style={[styles.listElement]}>
          <View style={[styles.listThumbnailWrapper, styles.listCharacterThumbnailWrapper]}>
            <Image source={imageList.characters['zeus']} style={[styles.listCharacterThumbnailWrapper, styles.listThumbnail]} />
          </View>
          <Text style={[styles.listSubTitle, styles.listCharacterSubtitle]}>{character}</Text>
        </View>
      )
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.placeWrapper]}>
          {this._renderTabHeader()}
          <View style={[styles.placeContent]}>
            <View>
              <Text style={styles.listTitle}>Chapitres</Text>
              <ScrollView horizontal={true} style={styles.listContent}>
                {this._renderChapterList()}
              </ScrollView>
            </View>
            <View>
              <Text style={styles.listTitle}>Personnages</Text>
              <ScrollView horizontal={true} style={styles.listContent}>
              {this._renderCharacterList()}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
    height: '85%',
    position: 'absolute'
  },
  placeHeader: {
    marginTop: 20,
    marginBottom: 20
  },
  placeWrapper: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: '100%',
  },
  placeHeaderWrapper: {
    width: '100%',
    marginTop: 30,
  },
  listElement: {
    width: 180,
    flexWrap: 'wrap',
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#c8cbce',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  listTitle: {
    fontFamily: fonts.RubikMedium,
    fontSize: 30,
    marginBottom: 15,
  },
  listSubTitle: {
    fontFamily: fonts.RubikMedium,
    fontSize: 22,
    marginTop: 10
  },
  listDescription: {
    fontFamily: fonts.RubikRegular,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  listThumbnail: {
    width: 180,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  listThumbnailWrapper: {
    width: 180,
  },
  listChapterThumbnailWrapper: {
    height: 120,
  },
  listCharacterThumbnailWrapper: {
    height: 200,
  },
  listCharacterSubtitle: {
    textAlign: 'center'
  },
  buttonLeft: {
    position: 'absolute',
    top: -50,
    left: 20
  },
  buttonRight: {
    position: 'absolute',
    top: -50,
    right: 20
  }
})
