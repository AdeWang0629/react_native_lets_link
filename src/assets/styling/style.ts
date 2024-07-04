import { StyleSheet } from 'react-native';
export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerFlex: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    marginTop: 20,
  },
  loginButton: {
    width: '90%',
    height: 55,
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { width: 180, height: 180, alignSelf: 'center', marginTop: 30 },
  textFeild: {
    height: 50,
    borderRadius: 6,
    // marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#E2E4E7',
    color: '#000000',
    padding: 10,
    fontSize: 16,fontFamily: 'Poppins-Medium',
  },
  headerButton: {
    width: 100,
    position: 'absolute',
    top: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loder_activity: {
    width: 100,
    position: 'absolute',
    right: 1,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetButton: {
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  optionButton: {
    justifyContent: 'center',
    marginRight: 20,
    alignItems: 'center',
  },
  searchBar: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    margin: 10,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },

  shadow: {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 5,
  },

  register_now: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },

  background_image_container: {
    flex: 1,
    resizeMode: 'contain', // or 'contain' to fit the image within the container
  },

  auth_heading_View: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 0,
  },
  heading: {
    color: '#000000',
    // fontWeight: '700',
    fontSize: 28,
    padding: 6
    ,fontFamily: 'Poppins-SemiBold',
  },
  sub_heading: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 22,
    padding: 6,fontFamily: 'Poppins',
  },
  parah: {
    color: '#797C7B',
    // fontWeight: '500',
    fontSize: 14,
    padding: 6, textAlign: 'center',fontFamily: 'Poppins-Medium',
  },
  black: {
    color: '#000000'
  }
});
