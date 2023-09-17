import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, FlatList, Platform, StyleSheet, TextInput, View, Keyboard } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function App() {

  const messages = [];
  for (let i = 1; i <= 50; i++) {
      messages.push({
          id: i,
          text: "This is message number " + i + "."
      });
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <KeyboardAwareFlatList
            data={messages}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <View >
                <Text>{item.text}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            extraScrollHeight={10}
          />

          <ProgressBar progress={0.5} color={'#6200ee'} style={styles.progressBar} />

          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
    alignItems: 'center',
  },
  progressBar: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
