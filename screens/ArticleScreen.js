import React from 'react';
import {ScrollView, Dimensions, Text, View} from 'react-native';
import HTML from 'react-native-render-html';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width - 40;

export default function ArticleScreen({data}) {
  const {title, content, modified, _embedded} = data || {};

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 20}}>
      <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>{title.rendered}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 12, fontWeight: 'bold', marginBottom: 10}}>
          {_embedded?.author?.[0]?.name}
        </Text>

        <Text style={{fontSize: 12, marginBottom: 10}}>{moment(modified).format('LLL')}</Text>
      </View>
      <HTML
        html={content.rendered}
        imagesMaxWidth={WIDTH}
        imagesInitialDimensions={{
          width: WIDTH,
          height: (WIDTH * 2) / 3,
        }}
      />
    </ScrollView>
  );
}
