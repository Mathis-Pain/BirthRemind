import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  // useState sont des variable qui peuvent changer d'etat
  // modaVisible info true false et setModalVisible fonction pour changer l'etat
  const [modalVisible, setModalVisible] = useState(false);
  const [listModalVisible, setListModalVisible] = useState(false);
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

  // Charger les données au démarrage. useEffect -> detecteur d'evenement de react execute du code automatiquement
  // async -> cette operation va prendre du temps try/catch fait des tentatives et attrape les erreurs avec le catch si il y en a
  // evite de crash en cas d'erreur
  // AsyncStorage "tiroir" ou on sauvegarde les données
  useEffect(() => {
    const loadBirthdays = async () => {
      try {
        const savedBirthdays = await AsyncStorage.getItem("birthdays");
        if (savedBirthdays) {
          setBirthdays(JSON.parse(savedBirthdays));
          console.log("Données chargées !");
        }
      } catch (error) {
        console.log("Pas de données sauvegardées (première utilisation)");
      }
    };
    loadBirthdays();
  }, []); // ← Le tableau vide [] signifie "exécute une seule fois au démarrage"

  // Sauvegarder un nouvel anniversaire
  // trim retire les epsace debut et fin de texte
  const saveBirthday = async () => {
    if (!name.trim()) {
      Alert.alert("Erreur", "Le nom est obligatoire !");
      return;
    }

    if (!day || !month) {
      Alert.alert("Erreur", "La date est obligatoire !");
      return;
    }

    const newBirthday = {
      id: Date.now(),
      name: name.trim(), // Nettoie les espaces
      day: day,
      month: month,
      year: year,
    };

    const updatedBirthdays = [...birthdays, newBirthday];
    setBirthdays(updatedBirthdays);

    // Sauvegarder dans AsyncStorage
    try {
      await AsyncStorage.setItem("birthdays", JSON.stringify(updatedBirthdays));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde", error);
    }
    // Réinitialiser les champs
    setName("");
    setDay("");
    setMonth("");
    setYear("");
    // fermer la modal
    setModalVisible(false);
  };

  // Supprimer un anniversaire avec confirmation (id: number) pour typer en TypeScript
  const deleteBirthday = async (id: number) => {
    // Trouve le nom de la personne pour l'afficher dans la popup
    // b représente chaque birthday donc on parcourt chaque birthday, on regarde son id et on le compare avec celui recherché.
    const birthday = birthdays.find((b) => b.id === id);

    Alert.alert(
      "⚠️ Supprimer ?", // Titre de la popup
      `Es-tu sûr de vouloir supprimer ${birthday?.name} ?`, // Message
      [
        {
          text: "Annuler", // Bouton gauche
          style: "cancel", // Style iOS (texte bleu)
        },
        {
          text: "Supprimer", // Bouton droite
          style: "destructive", // Style iOS (texte rouge)
          onPress: async () => {
            // Code de suppression
            const updatedBirthdays = birthdays.filter((b) => b.id !== id);
            setBirthdays(updatedBirthdays);

            try {
              await AsyncStorage.setItem(
                "birthdays",
                JSON.stringify(updatedBirthdays)
              );
              console.log("Anniversaire supprimé !");
            } catch (error) {
              console.error("Erreur lors de la suppression", error);
            }
          },
        },
      ]
    );
  };

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
          onPress={() => setListModalVisible(true)}
          style={{
            backgroundColor: "#6003a7ff",
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
            Afficher la liste des anniversaires
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: "green",
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 12,
            marginTop: 20,
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

      {/* MODAL - ajouter un anniversaire*/}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
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
      {/* MODAL - Liste des anniversaires */}
      <Modal visible={listModalVisible} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 15,
              width: "85%",
              maxHeight: "80%",
              padding: 20,
            }}
          >
            {/* Titre */}
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
                color: "#1a0033",
              }}
            >
              🎉 Mes Anniversaires
            </Text>

            {/* Liste des anniversaires */}
            {birthdays.length === 0 ? (
              // Si vide
              <View style={{alignItems: "center", padding: 30}}>
                <Text style={{fontSize: 16, color: "#999"}}>
                  🎈 Aucun anniversaire
                </Text>
                <Text style={{fontSize: 14, color: "#ccc", marginTop: 5}}>
                  Commence par en ajouter un !
                </Text>
              </View>
            ) : (
              // Sinon affiche la liste
              <View style={{maxHeight: 400}}>
                {birthdays.map((birthday) => (
                  <View
                    key={birthday.id}
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{fontSize: 18, fontWeight: "bold"}}>
                      👤 {birthday.name}
                    </Text>
                    <Text style={{fontSize: 14, color: "#666", marginTop: 5}}>
                      📅 {birthday.day}/{birthday.month}
                      {birthday.year ? `/${birthday.year}` : ""}
                    </Text>
                    <TouchableOpacity
                      onPress={() => deleteBirthday(birthday.id)}
                      style={{
                        padding: 10,
                        borderRadius: 8,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={{fontSize: 20}}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Bouton Fermer */}
            <TouchableOpacity
              onPress={() => setListModalVisible(false)}
              style={{
                backgroundColor: "#FF6B6B",
                paddingHorizontal: 30,
                paddingVertical: 12,
                borderRadius: 10,
                marginTop: 20,
                alignItems: "center",
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
