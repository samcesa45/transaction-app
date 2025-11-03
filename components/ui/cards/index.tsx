import { StyleSheet } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
type Props = {
  title: string;
  subtitle: string;
  leftIcon: string;
  rightIcon: string;
  mode: 'elevated' | 'outlined' | 'contained';
  onPress?: (index: any) => void;
  isActive:boolean
};
export const CardComponent = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  mode,
  isActive,
  onPress,
}: Props) => (
  <Card mode={mode} style={[styles.cardContainer,isActive && styles.activeCard]} onPress={onPress}>
    <Card.Title
      title={title}
      subtitle={subtitle}
      left={(props) => <Avatar.Icon {...props} icon={leftIcon} color={isActive ? '#fff' :'#000'} style={{backgroundColor:isActive ? 'red' :'#ccc'}}/>}
      right={(props) => (
        <IconButton {...props} icon={rightIcon} onPress={() => {}} />
      )}
      
    />
  </Card>
);

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    borderWidth:0,
    borderColor:'#ccc',
  },
  activeCard:{
    borderWidth:0,
    borderColor:'#ccc',
    backgroundColor:'#eee'
  }
});
