import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Image from "next/image";
import logo from "../images/miniusine4_405.jpg";

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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h1">Projix 3000</Typography>
        </Box>
        <Card sx={{ p: 2, boxShadow: 3, m: 5, borderRadius: 5 }}>
          <CardHeader
            avatar={
              session?.user.image ? (
                <Avatar
                  alt={session.user.name || ""}
                  src={session.user.image || ""}
                />
              ) : (
                <Avatar>{session?.user.name?.charAt(0)}</Avatar>
              )
            }
            title={
              session
                ? `Connecté en tant que ${session.user.name}`
                : "Non connecté"
            }
            subheader={session?.user.email}
          />
          <CardContent>
            <Typography variant="body1">
              {session?.user.isAdmin
                ? "Vous êtes admin"
                : "Vous n'êtes pas admin"}
            </Typography>
            <Box mt={2}>
              {session ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => signOut()}>
                  Déconnexion
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => signIn()}>
                  Connexion
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ p: 2, boxShadow: 3, m: 5, borderRadius: 5 }}>
          <CardHeader title="Projet Industriel" />
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Image
                src={logo}
                alt="SIF405"
                width={400}
                height={300} // Adjust height as needed
                style={{
                  float: "left",
                  marginRight: "20px",
                  borderRadius: 25,
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                }}
              />
              <Box>
                <Typography variant="h5" gutterBottom>
                  Présentation de la mini-usine
                </Typography>
                <Typography variant="body1">
                  La miniusine 4.0 est un système industriel qui permet de
                  produire des commandes de récipients rempli de billes de
                  différentes couleurs. On peut y choisir la forme du récipient,
                  la couleur ainsi que la quantité des billes souhaitées. Le
                  système est composé de 10 zones, chacunes traitant différentes
                  aspects.
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Le projet
                </Typography>
                <Typography variant="body1">
                  Ce projet industriel est une application web qui permet de
                  visualiser les données en temps réel d'un système industriel.
                  On reprend les données via des capteurs, celles-ci sont
                  transférées de l'automate à un node-red via le protocole
                  OPC-UA.
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Procédure
                </Typography>
                <Typography variant="body1" component="div">
                  <ul>
                    <li>Configuration de l'eWon</li>
                    <p>
                      Afin de récupérer les données d'un automate de manière
                      plus sécurisé que d'inconsciemment connecter celui-ci à
                      internet, on utilise un eWon qui va servire de passerelle,
                      de firewall et permet d'avoir un accès VPN et par
                      conséquent renforcer la securité.
                    </p>
                    <li>Configuration d'un node-red</li>
                    <p>
                      depuis Node-RED, nous avons installé une bibliothèque
                      capable de lire les données provenant du server OPC-UA en
                      utilisant la node OPC-UA Client.
                    </p>
                    <li>Récupération des données</li>
                    <p>yape bam boom</p>
                    <li>Configuration du Raspberry pi</li>
                    <p>en vrai jsp</p>
                  </ul>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
