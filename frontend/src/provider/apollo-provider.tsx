"use client";

import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client/react";

export default function ApolloWrapper({ children }: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
