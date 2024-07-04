import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useSelector, useDispatch} from 'react-redux';
import {types} from '../../store/actiontypes';
const Package = ({navigation}) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(0);
  const [allPackages, setAllPackages] = useState([]);
  const [link, setLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectpkg, setSelectedpkg] = useState({});
  const userdata = useSelector(state => state.auth.userData);
  console.log('user data ===>>>', userdata);
  useFocusEffect(
    React.useCallback(() => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(
        'http://50.18.33.245:4000/package/getAll',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          // console.log(result)
          const data = JSON.parse(result);
          if (data?.status === 'success') {
            setAllPackages(data?.data);
          }
        })
        .catch(error => console.error(error));
    }, []),
  );
  const handleBooking = val => {
    setSelectedpkg(val);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      itemName: val?.packageName,
      itemPrice: val?.price,
      currency: 'USD',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://50.18.33.245:4000/pay', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        const data = JSON.parse(result);
        setLink(data.approval_url);
        setShowModal(true);
      })
      .catch(error => console.log('error', error));
  };
  const handleWeb = val => {
    console.log('response from webView =====>>', val);
    if (val?.title === 'success') {
      // var myHeaders = new Headers();
      // myHeaders.append('Content-Type', 'application/json');

      // var raw = JSON.stringify({
      //   userId: authSelector?._id,
      //   vendorId: data?._id,
      //   service: data?.category,
      //   bookingDate: selected,
      // });

      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: 'follow',
      // };

      // fetch('http://54.88.124.233/api/v1/bookVenders', requestOptions)
      //   .then(response => response.text())
      //   .then(result => {
      //     console.log(result);
      //     const data = JSON.parse(result);

      //     if (data?.success === true) {
      //       Toast.show({
      //         type: ALERT_TYPE.SUCCESS,
      //         title: 'Success',
      //         textBody: 'Booking Successfully!',
      //       });

      //       navigation.goBack();
      //     }
      //   })
      //   .catch(error => console.log('error', error));
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        packageName: selectpkg?.packageName,
        amount: selectpkg?.price,
        coins: selectpkg?.coins,
        packageId: selectpkg?._id,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        `http://50.18.33.245:4000/user/buyPackage/${userdata?._id}`,
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          const data = JSON.parse(result);
          setShowModal(false);
          if (data?.status === 'success') {
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: data?.message,
              autoClose: 2000,
            });
            dispatch({
              type: types.USERDATA.success,
              payload: data.data,
            });
          } else {
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Error',
              textBody: data?.message,
              autoClose: 2000,
            });
          }
        })
        .catch(error => console.error(error));
    } else if (val?.title === 'cancel') {
      setShowModal(false);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Payment Cancelled',
      });
    } else {
      // return;
      console.log('hello world');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#000000', }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialIcons
            name={'arrow-back'}
            size={24}
            color={'white'}
            style={{}}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            color: '#ffffff',
            // fontWeight: '600',
            fontFamily: 'Poppins-Medium',
          }}>
          Coins
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Package')}
          style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/icons/coin.png')}
            style={styles.logo}
          />
          <Pressable>
            <Text
              style={[
                {
                  fontSize: 18,
                  color: '#ffffff',
                  marginLeft: 5,
                  // fontWeight: '600',
                  fontFamily: 'Poppins-Regular',
                },
                {fontSize: 14},
              ]}>
              {userdata?.coins ? userdata?.coins : '0'}
            </Text>
            <Text
              style={[
                {
                  fontSize: 18,
                  color: '#ffffff',
                  marginLeft: 5,
                  // fontWeight: '600',
                  fontFamily: 'Poppins-Regular',
                },
                {fontSize: 14},
              ]}>
              Coins
            </Text>
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
        {allPackages?.length > 0 &&
          allPackages?.map(item => {
            return (
              <TouchableOpacity
                onPress={() => handleBooking(item)}
                key={item?._id}
                style={{
                  marginTop: 20,
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  elevation: 2,
                  paddingHorizontal: '5%',
                }}>
                <View style={{height: '100%', width: '50%'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 18,
                      marginTop: 10,
                    }}>
                    {item?.packageName}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 22,
                    }}>
                    {item?.coins} Coins
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                      top: -10,
                    }}>
                    ${item?.price}
                  </Text>
                </View>

                <View
                  style={{
                    height: 40,
                    width: 100,
                    backgroundColor: 'rgba(101, 21, 172, 1)',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 18,
                      alignSelf: 'center',
                    }}>
                    Buy
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
        style={{flex: 1, paddingTop: 40}}>
        <WebView
          source={{uri: link}}
          style={{flex: 1}}
          onNavigationStateChange={res => handleWeb(res)}
        />
      </Modal>
    </View>
  );
};

export default Package;

const styles = StyleSheet.create({
  cotainer: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  logo: {
    width: 20,
    height: 35,
    // marginRight: 10
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
    color: '#000000',
    fontWeight: '600',
    marginLeft: 15,
    fontFamily: 'Poppins',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#EFE8E8',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins',
  },
});
