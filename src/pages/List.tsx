import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { trashBinOutline } from "ionicons/icons";
import React, { useState } from "react";

const List: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();

  useIonViewWillEnter(async () => {
    //or useEffect
    const users = await getUsers();
    console.log("users: " + users);

    setUsers(users);
    setLoading(false);
  });

  const getUsers = async () => {
    const data = await fetch("https://randomuser.me/api?results=10");
    const users = await data.json();
    return users.results;
  };

  const clearList = () => {
    showAlert({
      header: "Confirm!",
      message: "Are you sure you want to delete all users?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          role: "delete",
          handler: () => {
            setUsers([]);
            showToast({
              message: "Users deleted",
              duration: 2000,
              color: "danger",
            });
          },
        },
      ],
    });
  };

  const doRefresh = async (e: any) => {
    const data = await getUsers();
    setUsers(data);
    e.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
              <IonIcon
                slot="icon-only"
                icon={trashBinOutline}
                color={"light"}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar color={"success"}>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(e) => doRefresh(e)}>
          <IonRefresherContent />
        </IonRefresher>

        {loading &&
          [...Array(10)].map((_, i) => (
            <IonCard key={i}>
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <IonSkeletonText />
                  </IonAvatar>
                  <IonLabel>
                    <IonSkeletonText animated style={{ width: "150px" }} />
                    <p>
                      <IonSkeletonText />
                    </p>
                  </IonLabel>
                  <IonChip slot="end" color={"primary"}></IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}

        {users.map((user, i) => (
          <IonCard key={i}>
            <IonCardContent className="ion-no-padding">
              <IonItem lines="none">
                <IonAvatar slot="start">
                  <IonImg src={user.picture.thumbnail} />
                </IonAvatar>
                <IonLabel>
                  {user.name.first} {user.name.last}
                  <p>{user.email}</p>
                </IonLabel>
                <IonChip slot="end" color={"primary"}>
                  {user.nat}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default List;
