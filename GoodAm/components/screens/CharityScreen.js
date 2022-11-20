/*
Landing screen for the charity tab
*/
import React, {useState} from 'react';
import {View, Text, TextInput, Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors'; //our colors for the project, just call this everytime
import {ReusableButton} from '../ReusableButton';
import {ReusableModal} from '../ReusableModal';
import firestore from '@react-native-firebase/firestore';

const CharityScreen = props => {

  const [searchInput, setSearchInput] = useState('');
  const [finalSearchInput, setFinalSearchInput] = useState('');

  const [searchResult, setSearchResult] = useState([]);
/*
  fetch("https://partners.every.org/v0.2/nonprofit/animals?apiKey=4934bc69ecd7c295569bd7ee40473385").then((response) => response.json())
  .then((json) => initializeCharityInfo(json));

  const initializeCharityInfo = (json) => {
    console.log(json.nonprofits[2].name);
  };
  */

  searchForCharity = () => {
    setSearchInput(finalSearchInput);
    console.log();
    console.log(finalSearchInput);

    fetch("https://partners.every.org/v0.2/search/" + finalSearchInput + "?apiKey=4934bc69ecd7c295569bd7ee40473385").then((response) => response.json()).then((json) => printCharityinfo(json));
    //setSearchResult(fetchRequest[0]["ein"]);
    
  }

  printCharityinfo = (json) => {
    let np = json.nonprofits;

    const arr = [];

    for (let i = 0; i < np.length; i++){
      console.log(np[i].name);
      //arr.push(np[i].name + "\n");
      arr.push(<Text>{np[i].name}</Text>)
    }
    setSearchResult(arr);
  }

  return (
    <View style={style.container}>
      <Text style={style.font}>Search for a Charity</Text>
      <TextInput //allows for user text input
        placeholderTextColor={COLORS.indigoDye}
        style={style.input}
        onChangeText={newSearchVal => setFinalSearchInput(newSearchVal)}
      />
      <ReusableButton //create new alarm button, customizable
        title="Search"
        onPress={searchForCharity}></ReusableButton>
      <View style = {style.nonprofits}>
        {searchResult.map((x) => {
          return (
              <Text style = {style.individualNP}>{x}</Text>
          );
        }
        )}
      </View>
    </View>
    
  );
};

var fetchRequest = new Request ({
  url: "https://partners.every.org/v0.2/nonprofit/822281466?apiKey=4934bc69ecd7c295569bd7ee40473385"
});


const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.naplesYellow,
    bottom: 120,
  },
  font: {
    fontSize: 20,
    color: COLORS.indigoDye,
  },
  input: {
    margin: 15,
    height: 45,
    width: 150,
    top: 10,
    borderColor: COLORS.indigoDye,
    borderWidth: 3,
    color: COLORS.indigoDye,
    fontSize: 20,
  },
  alarmButtons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 20,
    color: COLORS.naplesYellow,
  },
  popupText: {
    margin: 15,
    top: 15,
    right: 15,
    height: 40,
    color: COLORS.lemonChiffon,
    fontSize: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    color: COLORS.indigoDye,
  },
  nonprofits: {
    top: 30,
  },
  individualNP: {
    top: 10,
    color: COLORS.indigoDye,
  },
});

export default CharityScreen;
