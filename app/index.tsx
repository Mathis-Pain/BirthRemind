import {View, Text, TouchableOpacity, Modal} from "react-native";
import {useState} from "react";

export default function Home() {
  // variable d'etat
  // modaVisible info true false et setModalVisible fonction pour changer l'etat
  const [modalVisible, setModalVisible] = useState(false);
  // useState pour les inputs permet a react de recuperer ce qu'il y a dedans value={name} (ce qui est en memoire)
  //  setName (quand l'utilisateur tape quelque chose, mets à jour la mémoire)
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // element d'interface
  //view a la meme utilité qu'une div pour afficher et organiser ce qui se troiuve a l'ecran
  // TouchableOpacity est un bouton tactile dont l'opacité diminue automatiquement pour donner un feedback visuel
  // prop est un argument donée au composant. Ici TouchableOpacity a une props par defaut onPress pour recuperer le clique
  // transparent et visible sont des props integrer par defaut au compasant modal

  return (
    // Vue principale
    <View style={{flex: 1, backgroundColor: "white"}}>
      {/* EN-TÊTE VIOLET */}
      <View
        style={{
          backgroundColor: "#6003a7ff",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          🎂 BirthRemind
        </Text>
      </View>

      {/* ZONE BLANCHE AVEC BOUTON CENTRÉ */}
      <View
        style={{
          flex: 1, // Prend l'espace restant
          backgroundColor: "white",
          width: "100%",
          justifyContent: "center", // centre verticalement
          alignItems: "center", // centre horizontalement
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: "green",
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            + Ajouter un anniversaire
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1, // ← Ajouté : prend tout l'écran
            backgroundColor: "rgba(0,0,0,0.7)", // ← Changé : plus foncé
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 25,
              borderRadius: 15,
              width: "85%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 20,
                color: "#1a0033",
              }}
            >
              📅 Ajouter une date d'anniversaire
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: "#FF6B6B",
                paddingHorizontal: 30,
                paddingVertical: 12,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Fermer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
