import React, {FC} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TaskDetails} from '../../models';
import {useAppDispatch} from '../../../../hooks/redux/hook';
import {deleteTask, updateTask} from '../../task.slice';

interface TaskComponentProps {
  tasks: TaskDetails;
  navigation: (id: number) => void;
}

const TaskComponent: FC<TaskComponentProps> = ({tasks, navigation}) => {
  const dispatch = useAppDispatch();

  const updateTaskMark = (task: TaskDetails, newValue: boolean) => {
    dispatch(updateTask({...task, completed: newValue}));
  };

  const onDeleteTask = (task: TaskDetails) => {
    dispatch(deleteTask(task));
  };

  return (
    <View
      key={`task_component_${tasks.id}`}
      style={{
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        // elevation: 1,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.2,
      }}>
      <TouchableOpacity
        onPress={() => navigation(tasks.id)}
        style={{
          flexDirection: 'row',
          padding: 5,
          flex: 2,
          alignItems: 'center',
        }}>
        <View
          style={{
            marginRight: 10,
          }}>
          <CheckBox
            disabled={false}
            value={tasks.completed}
            onValueChange={newValue => updateTaskMark(tasks, newValue)}
          />
        </View>
        <View>
          <Text style={{color: '#000000'}}>
            {tasks.todo.substring(0, 30)}...
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{marginRight: 8}}>
        <Icon
          name="trash"
          color="red"
          size={18}
          onPress={() =>
            Alert.alert('Delete', 'Are you sure want to delete this item?', [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => onDeleteTask(tasks),
                style: 'default',
              },
            ])
          }
        />
      </View>
    </View>
  );
};

export default TaskComponent;
