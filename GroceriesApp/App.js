import React, { useState } from 'react';
import Share from 'react-native-share';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [item, setItem] = useState('');
  const [groceryList, setGroceryList] = useState([]);

  const handleAddItem = () => {
    if (item.trim() !== '') {
      setGroceryList([...groceryList, { key: String(Date.now()), name: item }]);
      setItem('');
    }
  };

  const handleRemoveItem = (itemId) => {
    setGroceryList(groceryList.filter((item) => item.key !== itemId));
  };

  const onShare = async () => {
    const shareOptions = {
      title: 'Share Grocery List',
      message: 'Check out my grocery list!',
      url: 'https://www.mysimplegrocerylist.com', 
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Grocery List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter an item..."
          value={item}
          onChangeText={(text) => setItem(text)}
        />
        <Button title="Add" onPress={handleAddItem} />
      </View>
      <FlatList
        data={groceryList}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Button title="Remove" onPress={() => handleRemoveItem(item.key)} />
          </View>
        )}
      />
      <Button title="Share List" onPress={onShare} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default App;
