import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import React from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

GoogleSignin.configure({
  webClientId:
    "902126848839-22lgvlkuaf2dn53tf184pk4i68qkkgjf.apps.googleusercontent.com",
});

function GoogleSignInButton({ callback }: { callback: () => void }) {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(callback)}
    />
  );
}

export default function LoginPage({ navigation }: Props) {
  return (
    <View>
      <Text>Login page</Text>
      <GoogleSignInButton callback={() => console.log("success")} />
      <Button
        title="Continue"
        onPress={() => navigation.navigate("CreateGroup")}
      />
    </View>
  );
}
