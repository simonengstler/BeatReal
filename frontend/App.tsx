import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from "@tanstack/react-query";
import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import { AuthProvider } from "./components/context/AuthContext";
import { RootNavigator } from "./components/routes/RootNavigator";

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MenuProvider>
          <RootNavigator />
        </MenuProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
