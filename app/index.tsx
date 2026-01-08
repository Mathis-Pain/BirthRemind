import {View, Text} from "react-native"; // transforme le code en interface ios/android
import {useState} from "react"; // useState vient de react pour stocker un etat. React permet de mettre a jour l'ecran quand quelque chose change

export default function Home() {
  // variable d'etat
  // modaVisible info true false et setModalVisible fonctino pour changer l'etat
  const [modalVisible, setModalVisible] = useState(false);
  return (
    // element d'interface
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Mon app démarre ici !</Text>
    </View>
  );
}
