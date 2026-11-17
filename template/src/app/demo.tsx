import { ScrollView, Text, View } from "react-native";

import Card from "@/src/lib/cards/Card";
import EmptyCard from "@/src/lib/Empty/EmptyCard";
import TButton from "@/src/lib/buttons/TButton";
import CheckBox from "@/src/lib/inputs/CheckBox";
import InputText from "@/src/lib/inputs/InputText";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * ================== COMPONENTS DEMO ==================
 * This screen shows how to use the ready-made components from `src/lib`.
 * Splash (src/app/index.tsx) opens this screen after setup.
 *
 * When you start building your app:
 *  1. In src/app/index.tsx change router.replace("/demo") -> router.replace("/auth")
 *  2. Delete this file and its <Stack.Screen name="demo" /> in src/app/_layout.tsx
 * =====================================================
 */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={tw`gap-3`}>
    <Text style={tw`text-white60 text-xs uppercase tracking-widest`}>
      {title}
    </Text>
    {children}
  </View>
);

const Demo = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const fakeSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-base`}>
      <ScrollView
        contentContainerStyle={tw`p-5 gap-8 pb-16`}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`gap-1`}>
          <Text style={tw`text-white text-2xl font-bold`}>
            Your app is ready 🚀
          </Text>
          <Text style={tw`text-white60 text-sm`}>
            Components below come from src/lib. Open src/app/demo.tsx to see
            the code.
          </Text>
        </View>

        {/* ---------- Buttons: src/lib/buttons/TButton ---------- */}
        <Section title="Buttons (TButton)">
          <TButton
            title="Primary button"
            containerStyle={tw`bg-primary`}
            onPress={() => {}}
          />
          <TButton
            title={loading ? "Loading..." : "Press to show loading"}
            isLoading={loading}
            containerStyle={tw`bg-secondary`}
            onPress={fakeSubmit}
          />
          <TButton
            title="Disabled button"
            disabled
            containerStyle={tw`bg-primary`}
          />
        </Section>

        {/* ---------- Inputs: src/lib/inputs ---------- */}
        <Section title="Inputs (InputText + CheckBox)">
          <InputText
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            textInputProps={{
              keyboardType: "email-address",
              autoCapitalize: "none",
            }}
          />
          <InputText
            placeholder="Password"
            variant="password"
            value={password}
            onChangeText={setPassword}
            errorText={
              password && password.length < 6
                ? "Password must be at least 6 characters"
                : undefined
            }
            touched={!!password}
          />
          <CheckBox
            title="Remember me"
            titleStyle={tw`text-white`}
            checked={remember}
            onPress={setRemember}
          />
        </Section>

        {/* ---------- Card: src/lib/cards/Card ---------- */}
        <Section title="Card">
          <Card
            cardStyle={tw`bg-secondary p-4 rounded-xl`}
            onPress={() => router.push("/settings/about_us")}
            component={<Text style={tw`text-white text-lg`}>›</Text>}
          >
            <Text style={tw`text-white text-base`}>About us</Text>
            <Text style={tw`text-white60 text-xs`}>
              Tap to open a settings screen
            </Text>
          </Card>
        </Section>

        {/* ---------- Empty state: src/lib/Empty/EmptyCard ---------- */}
        <Section title="Empty state (EmptyCard)">
          <EmptyCard hight={140} />
        </Section>

        {/* ---------- Navigation: expo-router ---------- */}
        <Section title="Ready-made screens">
          <TButton
            title="Open login flow (/auth)"
            containerStyle={tw`bg-primary`}
            onPress={() => router.push("/auth")}
          />
          <TButton
            title="Open success modal"
            containerStyle={tw`bg-secondary`}
            onPress={() =>
              router.push({
                pathname: "/modals/success_modal",
                params: { message: "It works! 🎉" },
              })
            }
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Demo;
