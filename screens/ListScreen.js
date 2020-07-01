import React, {useState, useCallback, useEffect} from 'react';
import {FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {get} from '../lib/api';
import {Navigation} from 'react-native-navigation';

export default function ListScreen({componentId}) {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const fetchAllArticles = useCallback(
    async (payload = {}) => {
      setRefreshing(true);
      try {
        const {$refreshing, $page} = payload;
        if ($refreshing) {
          const response = await get('/wp-json/wp/v2/posts', {
            _embed: true,
            per_page: 20,
            page: 1,
          });
          setData(response);
          setPage(1);
        } else {
          console.log('DEBUG $page', $page);
          const response = await get('/wp-json/wp/v2/posts', {
            _embed: true,
            per_page: 20,
            page: $page,
          });
          setPage(page + 1);
          setData([...data, ...response]);
        }
      } catch (error) {
        console.log('DEBUG error', error);
      }
      setRefreshing(false);
    },
    [data, page],
  );

  useEffect(() => {
    const fetch = async () => {
      setRefreshing(true);
      const response = await get('/wp-json/wp/v2/posts', {
        _embed: true,
        per_page: 20,
        page: 1,
      });
      console.log('DEBUG refreshing response', response);
      console.log(
        'DEBUG thumbnail',
        response[0]?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.thumbnail
          ?.source_url,
      );
      setData(response);
      setRefreshing(false);
    };
    fetch();
  }, []);

  const handleRefresh = useCallback(() => {
    fetchAllArticles({$refreshing: true, $page: 1});
  }, [fetchAllArticles]);

  const handleLoadMore = useCallback(() => {
    fetchAllArticles({$page: page + 1});
  }, [fetchAllArticles, page]);

  const handlePress = item => {
    Navigation.push(componentId, {
      component: {
        name: 'ArticleScreen',
        passProps: {
          data: item,
        },
      },
    });
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <ListItem
          roundAvatar
          title={item.title.rendered}
          subtitle={item?._embedded?.author?.[0]?.name}
          leftAvatar={{
            source: {
              uri:
                item?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.thumbnail
                  ?.source_url,
            },
          }}
          containerStyle={{borderBottomWidth: 0}}
          titleStyle={{fontWeight: 'bold'}}
          subtitleStyle={{color: 'gray'}}
          onPress={() => handlePress(item)}
        />
      )}
      keyExtractor={item => item.id}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.4}
    />
  );
}
