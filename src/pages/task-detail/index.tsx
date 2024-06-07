import React, {useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {TaskDetailProps} from '../../types';
import {useAppDispatch, useAppSelector} from '../../hooks/redux/hook';
import {
  createTask,
  getTaskDetails,
  updateTask,
} from '../../features/task/task.slice';
import styles from './style';
import {TaskDetails} from '../../features/task/models';

function TaskDetailPage({navigation, route}: TaskDetailProps) {
  const {id} = route.params;
  const dispatch = useAppDispatch();
  const {task} = useAppSelector(state => state.task);

  const onUpdateTask = (param: TaskDetails) => {
    if (id) {
      dispatch(updateTask(param));
    } else if (!id) {
      dispatch(createTask(param));
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (id) dispatch(getTaskDetails(id));
  }, []);

  return (
    <View style={styles.container}>
      <TextInput style={{flex: 1}} textAlignVertical="top">
        {id && task.todo}
      </TextInput>
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => onUpdateTask(task)}>
          <Text style={styles.confirmText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TaskDetailPage;
