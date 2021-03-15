import React from 'react';
import { name } from 'faker';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { testProps } from '../lib/utils';

export default function ScrollScreen() {
  const data = [...Array(100).keys()].map(key => ({
    key,
    name: name.findName(), // Rowan Nikolaus
  }));

  const handleToggleShow = () => {
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItem key={item.key} bottomDivider {...testProps(item.name)}>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            {item.key === data.length - 1 && (
              <Button
                title="Show"
                onPress={handleToggleShow}
                {...testProps('messageSaveBtn')}
              />
            )}
          </ListItem>
        )}
        keyExtractor={item => item.key}
      />
      <View style={styles.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    textAlign: 'center',
  },
  bottom: {
    marginBottom: 50,
  },
});
