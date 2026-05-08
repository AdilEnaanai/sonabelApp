import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  inputProps?: TextInputProps;
};

export default function ChampInput<T extends FieldValues>({
  name,
  control,
  label,
  inputProps,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={s.champ}>
          <Text style={s.label}>{label}</Text>
          <TextInput
            style={[s.input, error && s.err]}
            value={value}
            onChangeText={onChange}
            {...inputProps}
          />
          {error && <Text style={s.msg}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  champ: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: "#003087", marginBottom: 5 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dde8ff",
    borderRadius: 10,
    padding: 13,
    fontSize: 14,
  },
  err: { borderColor: "#e53935" },
  msg: { color: "#e53935", fontSize: 12, marginTop: 3 },
});
