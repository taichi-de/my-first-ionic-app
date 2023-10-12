import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { checkmarkDoneOutline } from "ionicons/icons";
import React from "react";

const Register: React.FC = () => {
  const router = useIonRouter();
  const doRegister = (e: any) => {
    e.preventDefault();
    console.log("doRegister");
    router.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doRegister}>
                    <IonInput
                      fill="outline"
                      type="email"
                      label="Email"
                      placeholder="Email"
                    />
                    <IonInput
                      className="ion-marin-top"
                      fill="outline"
                      type="password"
                      label="Password"
                      placeholder="Password"
                    />
                    <IonButton
                      routerLink="/register"
                      color={"secondary"}
                      type="submit"
                      expand="block"
                      className="ion-marin-top"
                    >
                      Create my account
                      <IonIcon icon={checkmarkDoneOutline} slot="end" />
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
