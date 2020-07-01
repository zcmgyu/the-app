/* global alert */

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Input, Button, Text} from 'react-native-elements';
import baseStyles from '../styles/base';
import {testProps, USER_KEY, login} from '../lib/utils';
import {Navigation} from 'react-native-navigation';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    const {componentId} = this.props;
    // if we're already logged in, just go to the secret area already
    if (await AsyncStorage.getItem(USER_KEY)) {
      // Navigation.push(componentId, {
      //   component: {
      //     name: 'SecretScreen',
      //   },
      // });
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'SecretScreen',
                },
              },
            ],
          },
        },
      });
    }
  }

  async login() {
    const {componentId} = this.props;
    if (await login(this.state.username, this.state.password)) {
      this.setState({username: '', password: ''});

      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'SecretScreen',
                },
              },
            ],
          },
        },
      });
    } else {
      alert('Invalid login credentials, please try again');
    }
  }

  render() {
    const {username, password} = this.state;
    return (
      <View style={styles.loginView}>
        <Text h2>Login</Text>
        <Input
          placeholder="Username"
          style={styles.formEl}
          onChangeText={username => this.setState({username})}
          autoCapitalize="none"
          value={username}
          {...testProps('username')}
        />
        <Input
          placeholder="Password"
          style={styles.formEl}
          onChangeText={password => this.setState({password})}
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          {...testProps('password')}
        />
        <Button
          title="Login"
          style={styles.button}
          onPress={this.login}
          {...testProps('loginBtn')}
        />
        <Text>Valid account:</Text>
        <Text>Username: alice | Password: mypassword</Text>
        <Text>Username: bob | Password: totallysecure</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: baseStyles.margin * 5,
  },
  formEl: {
    height: 50,
    marginTop: baseStyles.margin * 2,
    width: '100%',
  },
  button: {
    marginTop: baseStyles.margin * 2,
    width: 'auto',
  },
});
