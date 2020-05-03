import * as React from "react";
import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";

// or any pure javascript modules available in npm
import { FAB, Surface, Button, TextInput } from "react-native-paper";

function NormalItem({ item }) {
  return <> {`할 일: ${item.description}${printEditing(item)}`}</>;
}

function EditItem({ todos, setTodos, item }) {
  function onChangeTeext(text) {
    item.description = text;
    setTodos([...todos]);
  }
  function onSubmitEditing() {
    console.log("onSubmitEditing");
    item.editing = false;
    setTodos([...todos]);
  }
  function onEndEditing() {
    console.log("onEndEditing");
    item.editing = false;
    setTodos([...todos]);
  }
  return (
    <TextInput
      onChangeText={onChangeTeext}
      value={item.description}
      onSubmitEditing={onSubmitEditing}
      onEndEditing={onEndEditing}
    />
  );
}

function renderTodoItem({ item, index, todos, setTodos }) {
  function onPress() {
    console.log("onPress");
    todos[index].editing = !todos[index].editing;
    setTodos([...todos]);
  }
  return (
    <Surface style={styles.todoItem}>
      {item.editing ? (
        <EditItem todos={todos} item={item} setTodos={setTodos} />
      ) : (
        <Button onPress={onPress}>
          <NormalItem item={item} />
        </Button>
      )}
    </Surface>
  );
}

export default function App() {
  const [todos, setTodos] = useState([newEmptyTodo()]);

  return (
    <View style={styles.container}>
      <FAB
        small
        icon="plus"
        onPress={() => {
          console.log("pressed");
          const newTodo = newEmptyTodo();
          setTodos([...todos, newTodo]);
        }}
        label="할 일 추가"
      />
      <FlatList
        data={todos}
        renderItem={({ item, index }) =>
          renderTodoItem({ item, index, todos, setTodos })
        }
      />
    </View>
  );
}

function newEmptyTodo() {
  return {
    description: "비어있는 할 일",
    editing: false,
    key: Math.random(),
  };
}

function printEditing(todoItem) {
  if (todoItem.editing) {
    return "(수정 중)";
  } else {
    return "";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  todoItem: {
    margin: 5,
    padding: 12,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
