import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Picker,
  Button,
} from "react-native";
import axios from "axios";

interface moneyPPP {
  ccy: string;
  buy: number;
}

export const Moneys: React.FC<moneyPPP> = (name, money) => {
  const [appState, setAppState] = useState({});
  const [get, onChangeGet] = React.useState("");
  const [post, onChangePost] = React.useState("");
  const [number, onChangeNumber] = React.useState(null);
  const [selectedValue, setSelectedValue] = useState("java");
  const getMoney = async () => {
    const apiUrl =
      "http://api.currencylayer.com/live?access_key=3f5e73141e57b0d552671cc7dc23135b";
    axios.get(apiUrl).then((response) => {
      const allMoney = response.data.quotes;
      setAppState(allMoney);
    });
    
  };
  useEffect(() => {
    getMoney();
    
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Конвертер валют</Text>
      <SafeAreaView style={styles.center}>
        <View style={styles.flex}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeGet}
            value={get}
            placeholder=""
          />
          
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
             {setSelectedValue(itemValue) }
            }
          >
            {Object.keys(appState).map(key => <Picker.Item label={key} value={appState[key]}  />)}
          </Picker>
        </View>
        <View style={styles.flex}>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={styles.input}
            onChangeText={onChangePost}
            value={post}
          />
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            {Object.keys(appState).map(key => <Picker.Item label={key} />)}
          </Picker>
        </View>
      </SafeAreaView>
      <Button title="app" onPress={() => console.log(appState)} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100vw",
    height: "60vh",
    backgroundColor: "black",
    marginTop: "20vh",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: "40px",
  },
  input: {
    width: "40vw",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  picker: {
    width: "10vw",
    height: 30,
  },
  flex: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  center: {
    marginTop: "17vh",
  },
});
