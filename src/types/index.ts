import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  TaskDetail: {id: number | null};
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type TaskDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskDetail'
>;
