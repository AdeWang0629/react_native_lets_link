import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <TouchableOpacity onPress={() => {
          props.navigation.toggleDrawer()
        }} style={styles.menuButton}>
          <MaterialCommunityIcons name={'menu'} size={24} color={'#ffffff'} />
        </TouchableOpacity>
        <Text style={styles.heading}>{props.screenName}</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons name={'notifications-none'} size={24} color={'#ffffff'} />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.searchContainer}>
        <MaterialIcons name={'search'} size={24} color={'#646161'} />

        <TextInput
          placeholder="Search"
          placeholderTextColor={'#646161'}
          style={styles.searchBar}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#6441A5',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  header_container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  menuButton: {
    marginRight: 16,
  },
  heading: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',fontFamily: 'Poppins',
  },

  notificationButton: {
    marginLeft: 16,
  },
  searchBar: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchLogo: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '80%',
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginTop: 15,
  },
});

export default Header;
