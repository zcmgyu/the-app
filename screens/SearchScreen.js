import React, { useState, useRef } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Linking, View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DATA = [
  { key: '1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { key: '2', content: 'Mauris dictum nisl a massa vehicula, id ullamcorper urna semper.' },
  { key: '3', content: 'Donec pellentesque magna eu egestas porta.' },
  { key: '4', content: 'Morbi condimentum nunc eget neque lobortis fermentum.' },
  { key: '5', content: 'Etiam imperdiet justo vitae augue eleifend, at ultricies urna euismod.' },
  { key: '6', content: 'Donec nec nulla eu risus posuere vehicula ut nec augue.' },
  { key: '7', content: 'Vivamus eu felis vehicula, bibendum arcu sit amet, porttitor lectus.' },
  { key: '8', content: 'Nunc sit amet libero vel metus sollicitudin posuere non sed tellus.' },
  { key: '9', content: 'Sed cursus turpis eget malesuada semper.' },
  { key: '10', content: 'Cras finibus leo nec sem elementum blandit.' },
  { key: '11', content: 'Vivamus venenatis est ac ligula fermentum, in tempor mauris aliquam.' },
  {
    key: '12',
    content: 'Nunc commodo velit ac felis facilisis, vel efficitur turpis consectetur.',
  },
  { key: '13', content: 'Vivamus quis lacus et est accumsan efficitur.' },
  { key: '14', content: 'Ut elementum justo vitae dolor tempor commodo.' },
  { key: '15', content: 'Praesent nec velit id diam dignissim tristique.' },
  { key: '16', content: 'Vestibulum vel mauris vestibulum, volutpat neque eu, efficitur odio.' },
  { key: '17', content: 'Phasellus quis risus efficitur, finibus ante quis, rhoncus magna.' },
  { key: '18', content: 'Duis sit amet sem at nibh placerat consequat euismod non lectus.' },
  { key: '19', content: 'Nulla ultrices dolor maximus, porta dolor vulputate, bibendum risus.' },
  { key: '20', content: 'Phasellus semper nisl ac tristique aliquet.' },
  { key: '21', content: 'Phasellus molestie massa ac mollis lacinia.' },
  { key: '22', content: 'Sed sit amet arcu vel nunc consequat venenatis vitae eu neque.' },
  { key: '23', content: 'Duis gravida orci vel libero aliquam malesuada.' },
  { key: '24', content: 'Mauris eget massa sodales, lacinia diam et, lobortis tortor.' },
  { key: '25', content: 'Phasellus in velit tristique, dapibus velit id, pretium tortor.' },
  { key: '26', content: 'Ut dictum nisi varius est hendrerit, vitae fermentum orci sagittis.' },
  { key: '27', content: 'Nulla vitae ante id ante sagittis scelerisque sit amet in nunc.' },
  { key: '28', content: 'Proin consectetur risus et ex porta aliquet.' },
  { key: '29', content: 'Nam blandit justo vitae risus feugiat, quis tempor arcu imperdiet.' },
  { key: '30', content: 'Nulla vitae est ac dui tincidunt eleifend eu lobortis mauris.' },
  { key: '31', content: 'Donec sit amet nibh nec odio luctus posuere.' },
  { key: '32', content: 'Morbi vitae ligula rhoncus, scelerisque augue at, tristique metus.' },
  { key: '33', content: 'Fusce sodales ligula id luctus consequat.' },
  {
    key: '34',
    content: 'Morbi hendrerit leo posuere nibh condimentum, maximus vestibulum velit egestas.',
  },
  { key: '35', content: 'Sed nec velit eget velit tempor vestibulum quis vitae odio.' },
  { key: '36', content: 'Cras interdum velit vitae feugiat pellentesque.' },
  { key: '37', content: 'Donec a tellus lobortis, luctus purus a, egestas urna.' },
  { key: '38', content: 'Curabitur at dolor congue dui fermentum vehicula.' },
  { key: '39', content: 'Vivamus feugiat turpis at convallis mollis.' },
  {
    key: '40',
    content: 'Pellentesque mollis metus nec nulla rhoncus, accumsan sodales eros volutpat.',
  },
  { key: '41', content: 'Duis hendrerit nisl a commodo porttitor.' },
  { key: '42', content: 'Nunc dictum lorem quis quam tincidunt ultrices.' },
  { key: '43', content: 'Duis nec ligula pulvinar, varius turpis et, ultrices massa.' },
  { key: '44', content: 'Nam laoreet ante id ultrices interdum.' },
  { key: '45', content: 'In eu lectus rhoncus, mattis purus non, suscipit ante.' },
  { key: '46', content: 'Aenean pharetra nunc sed ante gravida, nec venenatis eros convallis.' },
  { key: '47', content: 'Mauris non diam luctus, rhoncus eros id, maximus mauris.' },
  { key: '48', content: 'Nullam ut est ut tellus tempus condimentum quis sed justo.' },
  { key: '49', content: 'Duis facilisis ex nec lorem scelerisque tristique.' },
  { key: '50', content: 'Maecenas nec quam a diam accumsan rutrum vel quis orci.' },
];

export default function SearchScreen() {
  const [search1, setSearch1] = useState();
  const [search2, setSearch2] = useState();
  const [search3, setSearch3] = useState();
  const [search4, setSearch4] = useState();
  const [search5, setSearch5] = useState();
  const [searchType, setSearchType] = useState();
  const search5Ref = useRef();

  const handleSubmit1 = () => {
    setSearchType('search1');
    setSearch1(null);
  };

  const handleSubmit2 = () => {
    setSearchType('search2');
    setSearch2(null);
  };

  const handleSubmit3 = () => {
    setSearchType('search3');
    setSearch3(null);
  };

  const handleSubmit4 = () => {
    setSearchType('search4');
    setSearch4(null);
    search5Ref.current.focus();
  };

  const handleSubmit5 = () => {
    setSearchType('search5');
    // search1Ref.current.focus();
  };

  const handleClear = () => {
    setSearch1(null);
    setSearch2(null);
    setSearch3(null);
    setSearch4(null);
    setSearchType(null);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.loginView}>
        <Input
          accessibilityLabel="search1"
          label="Search 1"
          placeholder="Press 'Next' on keyboard to search"
          onChangeText={text => setSearch1(text)}
          autoCapitalize="none"
          value={search1}
          returnKeyType="next"
          onSubmitEditing={handleSubmit1}
        />
        <Input
          accessibilityLabel="search2"
          label="Search 2"
          placeholder="Press 'Go' on keyboard to search"
          onChangeText={text => setSearch2(text)}
          autoCapitalize="none"
          value={search2}
          returnKeyType="go"
          onSubmitEditing={handleSubmit2}
        />
        <Input
          accessibilityLabel="search3"
          label="Search 3"
          placeholder="Press 'Send' on keyboard to search"
          onChangeText={text => setSearch3(text)}
          autoCapitalize="none"
          value={search3}
          returnKeyType="send"
          onSubmitEditing={handleSubmit3}
        />
        <Input
          accessibilityLabel="search4"
          label="Search 4"
          placeholder="Press 'Next' to focus to 'Search 1'"
          onChangeText={text => setSearch4(text)}
          autoCapitalize="none"
          value={search4}
          returnKeyType="next"
          onSubmitEditing={handleSubmit4}
        />
        <Input
          accessibilityLabel="search5"
          label="Search 5"
          placeholder="Press 'Search'"
          onChangeText={text => setSearch5(text)}
          autoCapitalize="none"
          value={search5}
          returnKeyType="search"
          onSubmitEditing={handleSubmit5}
          ref={search5Ref}
        />
        <Button title="Clear" type="clear" onPress={handleClear} />
        <Text accessibilityLabel="result">Result: {searchType}</Text>
        {searchType && (
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => Linking.openURL(`http://google.com?q=${item.content}`)}>
                <Text style={{ color: 'blue', marginTop: 20 }}>{item.content}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

SearchScreen.options = {
  topBar: {
    title: {
      text: 'Search',
    },
  },
};

const styles = StyleSheet.create({
  loginView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
});
