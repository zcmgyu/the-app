import React, { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import { ListItem } from 'react-native-elements';
import { View, ScrollView, Platform, Linking } from 'react-native';
import { testProps, login } from '../lib/utils';

let viewList = [
  {
    name: 'Echo Box',
    desc: 'Write something and save to local memory',
    screen: 'Echo',
  },
  {
    name: 'Login Screen',
    desc: 'A fake login screen for testing',
    screen: 'Login',
  },
  {
    name: 'Clipboard Demo',
    desc: 'Mess around with the clipboard',
    screen: 'Clipboard',
  },
  {
    name: 'Webview Demo',
    desc: 'Explore the possibilities of hybrid apps',
    screen: 'Hybrid',
  },
  {
    name: 'Dual Webview Demo',
    desc: 'Automate apps with multiple webviews',
    screen: 'Hybrid2',
  },
  {
    name: 'List Demo',
    desc: 'Scroll through a list of stuff',
    screen: 'List',
  },
  {
    name: 'Search Demo',
    desc: 'Test Submit button on keyboard',
    screen: 'Search',
  },
  {
    name: 'Photo Demo',
    desc: 'Some photos with no distinguishing IDs',
    screen: 'Photo',
  },
  {
    name: 'Geolocation Demo',
    desc: 'See your current location',
    screen: 'Location',
  },
  {
    name: 'Picker Demo',
    desc: 'Use some picker wheels for fun and profit',
    screen: 'Picker',
  },
  {
    name: 'Scroll Demo',
    desc: 'Display random items in list',
    screen: 'Scroll',
  },
];

if (Platform.OS === 'android') {
  viewList.push({
    name: 'Verify Phone Number',
    desc: 'A fake SMS auto-verification screen',
    screen: 'VerifySMS',
  });
}

async function handleOpenUrl({ url }, componentId) {
  const route = url.replace(/.*?:\/\//g, '');
  const [handler, ...parts] = route.split('/');
  if (handler === 'login') {
    const loggedIn = await login(parts[0], parts[1]);
    let screen = 'LoginScreen';
    if (loggedIn) {
      screen = 'SecretScreen';
    }
    Navigation.push(componentId, {
      component: {
        name: screen,
      },
    });
  }
}

export default function HomeScreen({ componentId }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'Android') {
        const url = await Linking.getInitialURL();
        await handleOpenUrl({ url }, componentId);
      } else {
        Linking.addEventListener('url', handleOpenUrl);
      }
    })();
    return function cleanup() {
      Linking.removeEventListener('url', handleOpenUrl);
    };
  });

  return (
    <ScrollView>
      <View>
        {viewList.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() =>
              Navigation.push(componentId, {
                component: {
                  name: `${l.screen}Screen`,
                },
              })
            }
            {...testProps(l.name)}>
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.desc}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
}

HomeScreen.options = { topBar: { title: { text: 'TheApp' } } };
