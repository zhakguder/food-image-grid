import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
  Button,
} from 'react-native';
import _ from 'lodash';
import React, {useState} from 'react';

function FoodItem(props) {
  const [selected, setSelect] = useState(false);
  function onPress() {
    props.onSelected(props.id); // change the cell's value in parent's clicked array
    setSelect(!selected); // toggle clicked in cell's state
  }
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.cell,
        selected ? styles.cellSelected : styles.cellNotSelected,
      ]}>
      <Text style={{color: 'white'}}>{props.text}</Text>
    </Pressable>
  );
}

function renderItem({item}) {
  return (
    <FoodItem text={item.text} id={item.id} onSelected={item.onSelected} />
  );
}
function FoodGrid(props) {
  let clicked = []; // keep track of which grid cell is chosen
  _.times(props.n, () => clicked.push(false));
  function onSelected(i) {
    // will be called from each grid cell
    // to toggle the status after each click to the cell
    clicked[i] = !clicked[i];
    return clicked;
  }
  let data = [];
  _.times(props.n, (i) => {
    data.push({id: i, text: 'test' + i, onSelected: onSelected});
  });
  function onPress() {
    props.onPress(clicked);
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        key="h"
        columnWrapperStyle={{backgroundColor: 'green'}}
      />
      <Button
        onPress={onPress}
        title="Continue to Take Picture"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <View style={styles.instructionContainer}>
        <Text style={styles.instruction}>
          PLEASE SELECT ALL CELLS THAT CONTAIN FOOD
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default FoodGrid;

const styles = StyleSheet.create({
  cell: {
    paddingTop: '14%',
    paddingBottom: '14%',
    margin: '1.4%',
    width: '30%',
  },
  cellNotSelected: {
    backgroundColor: 'rgb(20, 30, 40)',
  },
  cellSelected: {
    backgroundColor: 'rgb(300,10,20)',
  },
  container: {flex: 1, width: '100%', justifyContent: 'space-between'},
  instruction: {fontSize: 24},
  instructionContainer: {},
});
