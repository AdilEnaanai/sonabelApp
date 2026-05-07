export type RegisterPayload = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  user: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};
