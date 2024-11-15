import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>PROJET INDUSTRIEL</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Card>
          <CardHeader
            title={
              session
                ? `Connecté en tant que ${session.user.name}`
                : "Non connecté"
            }
          />
        </Card>

        <Card>
          <CardHeader
            title={session?.user.isAdmin ? "Vous êtes admin" : null}
          />
        </Card>
      </Container>
    </>
  );
}
