import {signIn, signOut, useSession} from "next-auth/react";
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

export default function Home() {
    const {data: session} = useSession();

    return (<>
            <Head>
                <title>Home</title>
                <meta name="description" content="Projet industriel"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Container maxWidth="xl" sx={{mt: 4, mb: 4, pb: 2}}>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: "bold",
                            background: "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        Projet Industriel
                    </Typography>
                </Box>
                <Card
                    sx={{
                        p: 2, boxShadow: "0 0px 5px 0 rgba(41, 120, 215, 0.4)", m: 5, borderRadius: 5,
                    }}>
                    <CardHeader
                        avatar={session?.user.image ? (<Avatar
                                alt={session.user.name ?? ""}
                                src={session.user.image || ""}
                            />) : (<Avatar>{session?.user.name?.charAt(0)}</Avatar>)}
                        title={session ? `Connecté en tant que ${session.user.name}` : "Non connecté"}
                    />
                    <CardContent>
                        <Typography variant="body1">
                            {session?.user.isAdmin ? "Vous êtes admin" : "Vous n'êtes pas admin"}
                        </Typography>
                        <Box mt={2}>
                            {session ? (<Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => signOut()}>
                                    Déconnexion
                                </Button>) : (<Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => signIn()}>
                                    Connexion
                                </Button>)}
                        </Box>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        p: 2, boxShadow: "0 0px 5px 0 rgba(41, 120, 215, 0.4)", m: 5, borderRadius: 5,
                    }}>
                    <CardContent>
                        <Box sx={{display: "flex", alignItems: "flex-start"}}>
                            <Image
                                src="/images/miniusine4_405.jpg"
                                alt="SIF405"
                                width={400}
                                height={300}
                                style={{
                                    float: "left",
                                    marginRight: "20px",
                                    borderRadius: 25,
                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                                }}
                            />
                            <Box>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    m={2}
                                    fontWeight={"bold"}
                                    sx={{
                                        background: "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}>
                                    Présentation de la mini-usine
                                </Typography>
                                <Typography variant="body1" sx={{fontSize: "14pt"}}>
                                    La miniusine 4.0 est un système industriel qui permet de
                                    produire des commandes de récipients rempli de billes de
                                    différentes couleurs. On peut y choisir la forme du récipient,
                                    la couleur ainsi que la quantité des billes souhaitées. Le
                                    système est composé de 10 zones, chacunes traitant différents
                                    aspects.
                                </Typography>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    m={2}
                                    fontWeight={"bold"}
                                    sx={{
                                        background: "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}>
                                    Le projet
                                </Typography>
                                <Typography variant="body1" sx={{fontSize: "14pt"}}>
                                    Ce projet industriel est une application web permettant de
                                    visualiser les données en temps réel d&apos;un système industriel,
                                    ici, la miniusine 4. On reprend les données via des capteurs,
                                    celles-ci sont transférées de l&apos;automate à un node-red via le
                                    protocole OPC-UA.
                                </Typography>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    m={2}
                                    fontWeight={"bold"}
                                    sx={{
                                        background: "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}>
                                    Procédure
                                </Typography>
                                <Typography
                                    variant="body1"
                                    component="div"
                                    sx={{fontSize: "14pt"}}>
                                    <ul>
                                        <li>Configuration de l&apos;eWon</li>
                                        <p>
                                            Afin de récupérer les données de l&apos;automate de manière
                                            plus sécurisé que d&apos;inconsciemment connecter celui-ci à
                                            internet, on utilise un eWon qui va servir de passerelle,
                                            de firewall ainsi qu&apos;un accès VPN renforçant alors la
                                            securité.
                                        </p>
                                        <li>Configuration d&apos;un node-red</li>
                                        <p>
                                            depuis Node-RED, nous avons installé une bibliothèque
                                            capable de lire les données provenant du server OPC-UA en
                                            utilisant la node OPC-UA Client.
                                        </p>
                                        <li>Récupération des données</li>
                                        <p>
                                            Pour récupérer les données sur le Raspberry Pi, il nous
                                            faut un accès au node-red créé précédemment. Pour ce
                                            faire, il faut aller sur la page ayant besoin de ces
                                            données et d&apos;initialiser la connexion entre le WebSocket
                                            et le node-red, récupérant ainsi les données en temps
                                            réelles.
                                        </p>
                                        <li>Configuration du Raspberry pi</li>
                                        <p>
                                            Le Raspberry Pi possède une adresse IP fixe afin de
                                            l&apos;identifier facilement sur le réseau. Ensuite, on y a
                                            installer Docker afin de pouvoir créer la stack node-red
                                            pour récupérer les données OPC-UA de l&apos;automate.
                                        </p>
                                    </ul>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>);
}
