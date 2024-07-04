import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import userSocket from '../../socket';
const People = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const userdata = useSelector(state => state.auth.userData);
    console.log('user data ===>>>', userdata);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      userSocket.initializeSocket()
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(
        'http://50.18.33.245:4000/user/getAll',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          const data = JSON.parse(result);
          //   console.log(data);
          if (data?.status === 'success') {
            const arr = data?.data?.filter(item => {
              if (userdata?.gender === 'male') {
                return item?.gender === 'female' && item?.status === 'approved';
              } else {
                return item?.gender === 'male';
              }
            });
            console.log("response from filter ===", arr);
            // setUsers(data?.data);
            setUsers(arr);
          }
        })
        .catch(error => console.error(error));
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: '#000000', marginBottom: '15%'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            // navigation.toggleDrawer();
          }}>
          <MaterialCommunityIcons
            name={'menu'}
            size={35}
            color={'transparent'}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Let’s Chat </Text>
        <Pressable onPress={()=> navigation.navigate('Package')} style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/icons/coin.png')}
            style={styles.logo}
          />
          <Pressable >
            <Text style={[styles.heading, {fontSize: 14}]}>{userdata?.coins ? userdata?.coins : '0'}</Text>
            <Text style={[styles.heading, {fontSize: 14}]}>Coins</Text>
          </Pressable>
        </Pressable>
      </View>

      <View
        style={{
          marginTop: 0,
          backgroundColor: '#ffffff',
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingTop: 20,
        }}>
        <FlatList
          numColumns={3}
          data={users}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => {
                  console.log('pressing ');
                  navigation.navigate('PeopleProfile', {data: item});
                }}
                style={styles.card}>
                <View style={{flexDirection: 'row', height: '100%'}}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item?.image ? item?.image : null,
                    }}
                  />

                  <View
                    style={{
                      backgroundColor: '#0FE16D',
                      borderRadius: 50,
                      width: 15,
                      height: 15,
                      bottom: 5,
                      position: 'absolute',
                      right: 10,
                    }}></View>
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    color: '#000000',
                    fontWeight: '600',
                    marginTop: 10,
                    fontFamily: 'Poppins',
                  }}>
                  {item?.userName}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  logo: {
    width: 20,
    height: 35,
    marginRight: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    padding: 10,
    marginTop: 10,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 18,
    color: '#ffffff',
    // fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '33.3%',
    borderRadius: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 30,
    // backgroundColor: "red",
  },

  image: {
    width: 100,
    borderRadius: 100,
    height: 100,
    backgroundColor: 'grey',
  },
});
