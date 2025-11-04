import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  MaterialIcons,
  FontAwesome,
  Octicons,
  Feather,
  AntDesign,
} from '@expo/vector-icons';
import { router } from 'expo-router';
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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Fund account',
    icon: 'plus-circle',
    iconLibrary: 'Octicons',
    href: '/fund-account',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Transfer',
    icon: 'angle-double-right',
    iconLibrary: 'FontAwesome',
    href: '/transfer',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29f89',
    title: 'FX Sales',
    icon: 'refresh-cw',
    iconLibrary: 'Feather',
    href: '/fx-sales',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145572z38g67',
    title: 'Account details',
    icon: 'align-left',
    iconLibrary: 'AntDesign',
    href: '/account-details',
  },
];

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
