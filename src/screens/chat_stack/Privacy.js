import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Privacy = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialIcons
            name={'arrow-back'}
            size={24}
            color={'#000000'}
            style={{}}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Privacy Policy </Text>
        <Text></Text>
      </View>
      <ScrollView style={styles.cotainer} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}>
        <View style={{width: '85%', alignSelf: 'center', marginTop: 10}}>
          <Text
            style={{
              fontSize: 20,

              color: '#000000',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Privacy Policy
          </Text>
          <Text
            style={{
              fontSize: 14,

              color: '#000000',
              marginTop: 5,
              fontFamily: 'Poppins-Regular',
            }}>
            Lorem ipsum dolor sit amet consectetur. Eget turpis nunc vestibulum
            eget enean ac aliquet. Est integer sed odio sed. Vitae porttitor id
            feugiat.
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#000000',
              marginTop: 20,
              fontFamily: 'Poppins-SemiBold',
            }}>
            1. Lorem ipsum
          </Text>
          <Text
            style={{
              fontSize: 14,

              color: '#000000',
              marginTop: 5,
              fontFamily: 'Poppins-Regular',
            }}>
            Lorem ipsum dolor sit amet consectetur. Urna mattis quis turpis
            diam. Vestibulum phasellus blandit et maecenas tellus nunc. Lorem
            scelerisque neque suspendisse ipsum nisl. Tincidunt libero egestas
            ullamcorper nisi sit malesuada fusce sagittis sem. Magna neque non
            massa etiam suspendisse id odio. Scelerisque dictumst vel magna amet
            ultrices varius nisl ac facilisis. Aliquet tincidunt elementum sit
            suspendisse turpis nibh quam. Et sagittis sagittis vitae sit
            maecenas sed. Enim ut arcu pretium pretium nulla. Tortor cras nibh
            mattis ut euismod risus amet placerat amet. Nullam nibh sed eget vel
            eu urna mauris. A imperdiet consequat et in. Purus porta eget arcu
            turpis velit nisl ullamcorper nulla dui. Id erat et. Lorem ipsum
            dolor sit amet consectetur. Urna mattis quis turpis diam. Vestibulum
            phasellus blandit et maecenas tellus nunc. Lorem scelerisque neque
            suspendisse ipsum nisl. Tincidunt libero egestas ullamcorper nisi
            sit malesuada fusce sagittis sem. Magna neque non massa etiam
            suspendisse id odio. Scelerisque dictumst vel magna amet ultrices
            varius nisl ac facilisis. Aliquet tincidunt elementum sit
            suspendisse turpis nibh quam. Et sagittis sagittis vitae sit
            maecenas sed. Enim ut arcu pretium pretium nulla. Tortor cras nibh
            mattis ut euismod risus amet placerat amet. Nullam nibh sed eget vel
            eu urna mauris. A imperdiet consequat et in. Purus porta eget arcu
            turpis velit nisl ullamcorper nulla dui. Id erat et.Lorem ipsum
            dolor sit amet consectetur. Urna mattis quis turpis diam. Vestibulum
            phasellus blandit et maecenas tellus nunc. Lorem scelerisque neque
            suspendisse ipsum nisl. Tincidunt libero egestas ullamcorper nisi
            sit malesuada fusce sagittis sem. Magna neque non massa etiam
            suspendisse id odio. Scelerisque dictumst vel magna amet ultrices
            varius nisl ac facilisis. Aliquet tincidunt elementum sit
            suspendisse turpis nibh quam. Et sagittis sagittis vitae sit
            maecenas sed. Enim ut arcu pretium pretium nulla. Tortor cras nibh
            mattis ut euismod risus amet placerat amet. Nullam nibh sed eget vel
            eu urna mauris. A imperdiet consequat et in. Purus porta eget arcu
            turpis velit nisl ullamcorper nulla dui. Id erat et.Lorem ipsum
            dolor sit amet consectetur. Urna mattis quis turpis diam. Vestibulum
            phasellus blandit et maecenas tellus nunc. Lorem scelerisque neque
            suspendisse ipsum nisl. Tincidunt libero egestas ullamcorper nisi
            sit malesuada fusce sagittis sem. Magna neque non massa etiam
            suspendisse id odio. Scelerisque dictumst vel magna amet ultrices
            varius nisl ac facilisis. Aliquet tincidunt elementum sit
            suspendisse turpis nibh quam. Et sagittis sagittis vitae sit
            maecenas sed. Enim ut arcu pretium pretium nulla. Tortor cras nibh
            mattis ut euismod risus amet placerat amet. Nullam nibh sed eget vel
            eu urna mauris. A imperdiet consequat et in. Purus porta eget arcu
            turpis velit nisl ullamcorper nulla dui. Id erat et.{' '}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Privacy;

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
    fontFamily: 'Poppins-Medium',
  },
});