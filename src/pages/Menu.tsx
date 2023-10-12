import {
  IonContent,
  IonHeader,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { homeOutline, logOutOutline, newspaperOutline } from "ionicons/icons";
import React from "react";
import { Route, Redirect } from "react-router";
import List from "./List";
import Settings from "./Settings";

const Menu: React.FC = () => {
  const paths = [
    { name: "Home", url: "/app/list", icon: homeOutline },
    { name: "Settings", url: "/app/settings", icon: newspaperOutline },
  ];

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu content="main">
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item, i) => (
              <IonMenuToggle key={i} autoHide={false}>
                <IonItem
                  detail={false}
                  routerLink={item.url}
                  routerDirection="none"
                >
                  <IonIcon slot="start" icon={item.icon} />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}
            <IonMenuToggle autoHide={false}>
              <IonButton expand="full" routerLink="/" routerDirection="root">
                <IonIcon slot="start" icon={logOutOutline} />
                Logout
              </IonButton>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="main">
          <Route exact path="/app/list" component={List} />
          <Route path="/app/settings" component={Settings} />
          <Route exact path="/app">
            <Redirect to="/app/list" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
