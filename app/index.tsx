import {View, Text, TouchableOpacity, Modal, TextInput} from "react-native";
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
  // pour indiquer a TypeScript le type d'objet a stocker
  const [birthdays, setBirthdays] = useState<
    Array<{
      id: number;
      name: string;
      day: string;
      month: string;
      year: string;
    }>
  >([]);

  const saveBirthday = () => {
    const newBirthday = {
      id: Date.now(),
      name: name,
      day: day,
      month: month,
      year: year,
    };

    // ajouter au tableau
    setBirthdays([...birthdays, newBirthday]);
    // Réinitialiser les champs
    setName("");
    setDay("");
    setMonth("");
    setYear("");
    // fermer la modal
    setModalVisible(false);
  };

  // element d'interface
  //view a la meme utilité qu'une div pour afficher et organiser ce qui se troiuve a l'ecran
  // TouchableOpacity est un bouton tactile dont l'opacité diminue automatiquement pour donner un feedback visuel
  // prop est un argument donée au composant. Ici TouchableOpacity a une props par defaut onPress pour recuperer le clique
  // transparent et visible sont des props integrer par defaut au compasant modal

  return (
    // Vue principale
    <View style={{flex: 1, backgroundColor: "white"}}>
      <Text>{JSON.stringify(birthdays)}</Text>
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
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
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#333",
                marginBottom: 5,
              }}
            >
              Nom
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#6003a7ff",
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                marginBottom: 15,
                backgroundColor: "#f9f9f9",
              }}
              placeholder="Ex: Marie"
              value={name}
              // Updates the "name" state
              onChangeText={setName}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#333",
                marginBottom: 5,
              }}
            >
              Date de naissance
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 15,
              }}
            >
              <TextInput
                value={day}
                onChangeText={setDay}
                placeholder="JJ"
                keyboardType="numeric"
                maxLength={2}
                style={{
                  borderWidth: 1,
                  borderColor: "#6003a7ff",
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: "#f9f9f9",
                  flex: 1,
                  marginRight: 5,
                  textAlign: "center",
                }}
              />
              <TextInput
                value={month}
                onChangeText={setMonth}
                placeholder="MM"
                keyboardType="numeric"
                maxLength={2}
                style={{
                  borderWidth: 1,
                  borderColor: "#6003a7ff",
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: "#f9f9f9",
                  flex: 1,
                  marginRight: 5,
                  textAlign: "center",
                }}
              />
              <TextInput
                value={year}
                onChangeText={setYear}
                placeholder="AAAA"
                keyboardType="numeric"
                maxLength={4}
                style={{
                  borderWidth: 1,
                  borderColor: "#6003a7ff",
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: "#f9f9f9",
                  flex: 1.5,
                  marginRight: 5,
                  textAlign: "center",
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={saveBirthday}
                style={{
                  backgroundColor: "green",
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
                  Ajouter
                </Text>
              </TouchableOpacity>

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
        </View>
      </Modal>
    </View>
  );
}
