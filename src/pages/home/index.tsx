import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import TaskCompnent from '../../features/task/components/task';
import {getTasks} from '../../features/task/task.slice';
import {useAppDispatch, useAppSelector} from '../../hooks/redux/hook';
import styles from './style';
import {HomeScreenProps} from '../../types';

const Home = ({navigation}: HomeScreenProps) => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState<number>(1);
  const [limit, setLimit] = useState<number>(1);
  const [total, setTotal] = useState<number>(15);

  const {tasks} = useAppSelector(state => state.task);

  const seeDetails = (id: number) => {
    navigation.navigate('TaskDetail', {id});
  };

  const onBtnCreate = () => {
    navigation.navigate('TaskDetail', {id: null});
  };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={onBtnCreate}>
          <Text style={styles.confirmText}>New Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks.todos}
        renderItem={({item}) => (
          <TaskCompnent key={item.id} tasks={item} navigation={seeDetails} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => setSkip(skip + 1)}
        initialNumToRender={limit}
      />
    </View>
  );
};

export default Home;
