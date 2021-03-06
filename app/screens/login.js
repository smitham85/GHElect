import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import LinearGradient from 'react-native-linear-gradient';
import { scaleModerate, scaleVertical } from '../utils/scale';

export class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  renderImage = () => {
    const screenSize = Dimensions.get('window');
    const imageSize = {
      width: screenSize.width,
      height: screenSize.height - scaleModerate(375, 1),
    };
    return (
      <Image
        style={[styles.image, imageSize]}
        source={require('../assets/images/logo_transparent.png')}
      />
    );
  };

  onLoginButtonPressed = () => {
    this.props.navigation.navigate('Tasks');
  };

  onSignUpButtonPressed = () => {
    this.props.navigation.navigate('SignUp');
  };

  render = () => (
    <RkAvoidKeyboard
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}
      style={styles.screen}
    >
      {this.renderImage()}
      <View style={styles.container}>
        <RkTextInput rkType="rounded" placeholder="Username" />
        <RkTextInput rkType="rounded" placeholder="Password" secureTextEntry />
        <LinearGradient
          colors={['#8a2387', '#e94057', '#f27121']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            alignSelf: 'stretch',
            height: scaleVertical(45),
            marginVertical: 20,
            borderRadius: 28,
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onLoginButtonPressed}
          >
            <View style={styles.textRow}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType="primary3">Don’t have an account? </RkText>
            <RkButton rkType="clear">
              <RkText
                rkType="header6"
                style={{ fontWeight: 'bold' }}
                onPress={this.onSignUpButtonPressed}
              >
                Sign up now
              </RkText>
            </RkButton>
          </View>
        </View>
      </View>
    </RkAvoidKeyboard>
  );
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    marginBottom: 10,
    height: scaleVertical(210),
    resizeMode: 'contain',
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1,
  },
  footer: {
    flex: 0,
    justifyContent: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
  },
  button: {
    marginHorizontal: 14,
  },
  save: {
    marginVertical: 9,
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: scaleVertical(14),
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  buttonText: {
    textAlign: 'center',
    color: theme.colors.screen.base,
    paddingTop: 18,
    marginLeft: 1,
    marginRight: 1,
    fontWeight: 'bold',
    fontSize: 19,
  },
}));
