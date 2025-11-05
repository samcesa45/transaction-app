import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  MaterialIcons,
  FontAwesome,
  Octicons,
  Feather,
  AntDesign,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { DATA } from '@/constant';
type IconLibraryName =
  | 'MaterialIcons'
  | 'FontAwesome'
  | 'Octicons'
  | 'Feather'
  | 'AntDesign';

const ICON_LIBRARIES: Record<IconLibraryName, any> = {
  MaterialIcons,
  FontAwesome,
  Octicons,
  Feather,
  AntDesign,
};

type ItemProps = {
  icon: string;
  title: string;
  href?: string;
  iconLibrary: IconLibraryName;
};

const Item = ({ title, icon, iconLibrary, href }: ItemProps) => {
  const IconComponent = ICON_LIBRARIES[iconLibrary];
  return (
    <Pressable
      onPress={() => router.push(href as any)}
      style={styles.cardContainer}
    >
      <View style={styles.card}>
        <View>
          <IconComponent name={icon} size={28} color="#FF2400" />
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default function QuickActions() {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <Item
          key={item.id}
          title={item.title}
          icon={item.icon}
          iconLibrary={item.iconLibrary as IconLibraryName}
          href={item.href}
        />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 35,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(250, 95, 85,0.8)',
    borderRadius: 30,
    backgroundColor: 'rgba(250, 95, 85,0.2)',
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: '#FF2400',
    fontWeight: '400',
  },
});
