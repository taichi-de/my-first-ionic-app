import {
  IonButton,
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
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import { useState, useEffect } from "react";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(true);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);

  const doLogin = async (e: any) => {
    e.preventDefault();
    await present("Logging in ...");
    setTimeout(() => {
      dismiss();
      router.push("/app", "root");
    }, 2000);
  };

  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: "true" });
  };

  const setIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };

  return (
    <>
      {introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color={"secondary"}>
              <IonTitle>Free Code Camp</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent scrollY={false} className="ion-padding">
            <IonGrid fixed>
              <IonRow className="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6">
                  <div className="ion-text-center ion-padding">
                    <img src="" alt="" width={"50%"} />
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonCard>
              <IonCardContent>
                <form onSubmit={doLogin}>
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
                    type="submit"
                    expand="block"
                    className="ion-marin-top"
                  >
                    Login
                    <IonIcon icon={logInOutline} slot="end" />
                  </IonButton>
                  <IonButton
                    routerLink="/register"
                    color={"secondary"}
                    type="submit"
                    expand="block"
                    className="ion-marin-top"
                  >
                    Create account
                    <IonIcon icon={personCircleOutline} slot="end" />
                  </IonButton>

                  <IonButton
                    onClick={setIntroAgain}
                    fill="clear"
                    routerLink="/register"
                    size="small"
                    color={"medium"}
                    type="button"
                    expand="block"
                    className="ion-marin-top"
                  >
                    Watch intro again
                    <IonIcon icon={personCircleOutline} slot="end" />
                  </IonButton>
                </form>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
