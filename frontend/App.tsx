import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { AuthProvider } from "./components/context/AuthContext";
import { RootNavigator } from "./components/routes/RootNavigator";
import { MenuProvider } from "react-native-popup-menu";

const queryClient = new QueryClient();

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
