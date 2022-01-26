import React from "react";
import subscribe from './Function/subscription_webPush';
import { PushNotification } from "./Component/PushNotification";

function App() {
  subscribe("news");

  return (
    <PushNotification />
  );
}

export default App;
