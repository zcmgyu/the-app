import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';

export default function ArticleScreen({data}) {
  const {title, content, modified, _embedded} = data || {};

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 20}}>
      <Text accessibilityLabel="title" style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>
        {title.rendered}
      </Text>
      <View
        accessibilityLabel="author"
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 12, fontWeight: 'bold', marginBottom: 10}}>
          {_embedded?.author?.[0]?.name}
        </Text>

        <Text style={{fontSize: 12, marginBottom: 10}}>{moment(modified).format('LLL')}</Text>
      </View>
      <HTMLView value={content.rendered} stylesheet={styles} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});
