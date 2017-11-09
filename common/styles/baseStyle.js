import {StyleSheet} from 'react-native';
const baseStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    color: '#0070C0',
    fontWeight: 'bold',
    width: 300,
    textAlign: 'left'
  },
  input: {
    width: 300,
    textAlign: 'left',
    marginLeft: 15,
    padding:6
  },
  btnWrap: {
    width: 300,
    margin:30,
    backgroundColor: '#0070C0',
    alignItems: 'center',
    borderRadius: 2
  },
  btnContent: {
    fontWeight: 'bold',
    color: 'white',
    margin: 5
  },
  button:
  {
    flex:1,
    margin:30,
    backgroundColor: '#0070C0',
    alignItems: 'center',
    borderRadius: 2
  },
  textButton:
  {
    fontWeight: 'bold',
    color: 'white',
    margin: 5
  }
});
export default baseStyle;
