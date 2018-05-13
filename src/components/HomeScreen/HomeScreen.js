import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Image, Button } from 'react-native'
import {connect} from 'react-redux';
import storageSessionManager from './../../store/StorageSessionManager'
import StorageSessionManager from './../../store/StorageSessionManager';
import { LinearGradient } from 'expo'

class HomeScreen extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('./../../assets/splash/splash.png')} style={styles.splashImage} />
        <View style={styles.buttonStorage} >
          <Button title="empty Local Storage" onPress={ () => StorageSessionManager.clearStorage()} />
          <Button title="get Data from API" onPress={ () => {
            StorageSessionManager.getDataFromApi()
          } } />
        </View>
        <LinearGradient
          start={[0, 0]} end={[1, 0]}
          colors={['rgba(0, 101, 206, 0)','#0065CE']}
          style={styles.buttonContainer}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Map')} style={styles.button} underlayColor='#fff'>
            <Text style={styles.buttonText}> Commencer l'aventure </Text>
        </TouchableHighlight>
        </LinearGradient>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "white",
  },
  buttonContainer: {
    width: 300,
    height: 60,
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    top: '65%',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 1,
    marginRight: 1,
    width: 298,
    height: 58,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  buttonText: {
    color: '#0065CE',
    fontSize: 21,
    alignItems: 'center',
    textAlign: 'center',
    padding: 15,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30
  },
  buttonStorage: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    flex: 1,
  }
})

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
