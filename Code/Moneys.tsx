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
  /*объект, полученный с апи*/
  const [appState, setAppState] = useState({});
  /*Колличество нной валюты, которое пишется в верхний инпут*/
  const [get, onChangeGet] = React.useState("");
  /*численное значение первой валюты относительно доллара*/
  const [post, onChangePost] = React.useState(0.0);
  const [selectedValue1, setSelectedValue1] = useState("java");
  const [selectedValue2, setSelectedValue2] = useState("java");
  /*численное значение второй валюты относительно доллара*/
  const [perem, setPerem] = useState(0.0);
  /*Результат, который выводится во второй инпут*/
  const [result, setResult] = useState("");
  const getMoney = async () => {
    const apiUrl =
      "http://api.currencylayer.com/live?access_key=3f5e73141e57b0d552671cc7dc23135b";
    axios.get(apiUrl).then((response) => {
      const allMoney = response.data.quotes;
      setAppState(allMoney);
    });
  };
  const Convert = async () => {
    setResult(String((Number(get) / Number(post)) * perem));
    console.log(appState);
    console.log("post=", post);
    console.log("perem=", perem);
    console.log("get=", Number(get));
    console.log("result=", result);
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
            placeholder={get}
          />

          <Picker
            selectedValue={selectedValue1}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue1(itemValue);
              onChangePost(itemValue);
            }}
          >
            {Object.keys(appState).map((key) => (
              <Picker.Item
                label={key}
                value={appState[key as keyof typeof appState]}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.flex}>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setResult}
            value={String(result)}
          />
          <Picker
            selectedValue={selectedValue2}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue2(itemValue);
              setPerem(itemValue);
            }}
          >
            {Object.keys(appState).map((key) => (
              <Picker.Item
                label={key}
                value={appState[key as keyof typeof appState]}
              />
            ))}
          </Picker>
        </View>
      </SafeAreaView>
      <View style={styles.button}>
        <Button
          title="Посчитать"
          onPress={() => Convert()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100vw",
    //height: "40vh",
    backgroundColor: "black",
    marginTop: "30vh",
    paddingBottom:"3vh"
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
    marginTop: "5vh",
  },
  button: {
    marginRight: "20vw",
    marginLeft: "20vw",
    marginTop:"2vh"
  },
});
