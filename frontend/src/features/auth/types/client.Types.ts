type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export type GetClientTypes = {
  clients: Client[];
};