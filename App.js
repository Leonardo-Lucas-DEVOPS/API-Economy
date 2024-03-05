import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const request = async (callback) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
    const { USDBRL, EURBRL, BTCBRL } = await response.json();
    callback([USDBRL, EURBRL, BTCBRL]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default function App() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    request(setRegistros);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cotação de Moedas</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={registros}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.nameText}>Nome: {item.name}</Text>
            <Text style={styles.eyeColorText}>Valor: {item.bid}</Text> 
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eyeColorText: {
    fontSize: 16,
  },
});
