// import React, { useState, useEffect } from 'react';
// import { KeyboardAvoidingView, ScrollView, FlatList, Platform, StyleSheet, TextInput, View, Keyboard } from 'react-native';
// import { ProgressBar, Text } from 'react-native-paper';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Keyboard, Platform, KeyboardAvoidingView, FlatList, Text } from 'react-native';

export default App = (props) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(null);
  const initialLayoutRef = useRef(true);
  const maxHeightRef = useRef(0);

  const getMessagesContainerHeightWithKeyboard = (composerHeight) => {
    return (maxHeightRef.current - composerHeight - getKeyboardHeight());
  };
  
  const getKeyboardHeight = () => {
    if (Platform.OS === 'android') {
      return 0;
    }
    return keyboardHeight;
  };
  


    const messages = [];
  for (let i = 1; i <= 50; i++) {
      messages.push({
          id: i,
          text: "This is message number " + i + "."
      });
  }

  useEffect(() => {
    // Listen to keyboard events
    const keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      handleKeyboardWillShow
    );
    const keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      handleKeyboardWillHide
    );

    const keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow
    );
    const keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide
    );

    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  }, []);

  const handleKeyboardWillShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
    setContainerHeight(getMessagesContainerHeightWithKeyboard(40)); // assuming 40 as composer height
  };

  const handleKeyboardWillHide = () => {
    setKeyboardHeight(0);
    setContainerHeight(maxHeightRef.current);
  };

  const handleKeyboardDidShow = (e) => {
    if (Platform.OS === 'android') {
      handleKeyboardWillShow(e);
    }
  };

  const handleKeyboardDidHide = () => {
    if (Platform.OS === 'android') {
      handleKeyboardWillHide();
    }
  };

  const onContainerLayout = (e) => {
    const { layout } = e.nativeEvent;
    if (initialLayoutRef.current) {
      setContainerHeight(layout.height);
      initialLayoutRef.current = false;
    }
  };

  const onMainViewLayout = (e) => {
    const { layout } = e.nativeEvent;
    if (layout.height !== maxHeightRef.current) {
      maxHeightRef.current = layout.height;
      setContainerHeight(getMessagesContainerHeightWithKeyboard(40));
    }
  };
  

  return (
    <KeyboardAvoidingView 
    enabled
    style={{ flex: 1 }} 
    // behavior={Platform.OS === "ios" ? "padding" : null}
    onLayout={onMainViewLayout}
  >
      <View style={{ height: containerHeight - keyboardHeight, backgroundColor: 'white' }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text>{item.text}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          
          extraScrollHeight={10}
        />
        <TextInput placeholder="Type here..." style={{height: 40, borderColor: 'gray', borderWidth: 1 }} />
    </View>
    </KeyboardAvoidingView>
  );
};

// export default KeyboardAvoidingContainer;


//   const messages = [];
//   for (let i = 1; i <= 50; i++) {
//       messages.push({
//           id: i,
//           text: "This is message number " + i + "."
//       });
//   }

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.container}>
//           {/* <KeyboardAwareFlatList
//             data={messages}
//             style={{ flex: 1 }}
//             renderItem={({ item }) => (
//               <View >
//                 <Text>{item.text}</Text>
//               </View>
//             )}
//             keyExtractor={item => item.id.toString()}
//             extraScrollHeight={10}
//           /> */}
//           {
//             messages.map((item, index) => (
//               <View key={index} style={{ padding: 10 }}>
//                 <Text>{item.text}</Text>
//               </View>
//             ))
//           }

//           <ProgressBar progress={0.5} color={'#6200ee'} style={styles.progressBar} />

//           <TextInput
//             style={styles.textInput}
//             placeholder="Type a message..."
//           />
//         </View>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     padding: 10,
//     alignItems: 'center',
//   },
//   progressBar: {
//     marginVertical: 10,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//   },
// });

