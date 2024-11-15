import * as React from "react";
import { makeStyles } from "@mui/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import Head from "next/head";
import Grid from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import { tableLive } from "../strucTables";
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
import { useState } from "react";

export default function Home() {
  const [live, setLive] = useState<Array<any>>();
  React.useEffect(() => {
    // Récupération des relais
    fetch("/api/getLive", { method: "POST" })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        //setLive(res);
      });
  }, []);

  return (
    <>
      <Head>
        <title>PROJET INDUSTRIEL</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Card>
              <CardHeader title="Relais" />
              <CardContent>
                <DataGrid columns={tableLive} hideFooter rows={live} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
