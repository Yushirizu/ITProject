import * as React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import { BarChart, LineChart } from "@mui/x-charts";
import { useSession } from "next-auth/react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function Home() {
  const { data: session, status } = useSession() as {
    data: { user: { isAdmin: boolean } } | null;
    status: string;
  };
  const [chartData, setChartData] = useState<Array<{ id: number; ec: number }>>(
    []
  );
  const [barchartData, setbarChartData] = useState<
    Array<{ id: number; ec: number }>
  >([]);

  useEffect(() => {
    setInterval(() => {
      fetch("/api/getCharts", { method: "POST" })
        .then((response) => response.json())
        .then((res) => {
          const dataset = res.map((item: any) => ({
            id: item.id,
            ec: item.EnergyConsumed,
            fcc: item.FeedCapCarre,
            fcr: item.FeedCapRound,
          }));
          setChartData(dataset);
          setbarChartData(dataset.slice(-5));
        });
    }, 1000);
  }, []);

  if (status === "unauthenticated" || session?.user.isAdmin === false) {
    return (
      <Container maxWidth="xl">
        <Card sx={{ mt: 4, p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Please sign in to an admin account to access this page
          </Typography>
        </Card>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>PROJET INDUSTRIEL - Charts</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box mb={4}>
          <Typography variant="h3" gutterBottom>
            Charts
          </Typography>
          <Typography variant="body1">
            This page displays two charts representing the industrial system's
            data.
          </Typography>
        </Box>
        <Card sx={{ p: 2, boxShadow: 3, m: 5, borderRadius: 5 }}>
          <CardHeader title="Total energy consumed" />
          <CardContent>
            <Box display="flex" justifyContent="center">
              <LineChart
                xAxis={[{ dataKey: "id" }]}
                yAxis={[
                  {
                    colorMap: {
                      type: "continuous",
                      min: -10,
                      max: 10,
                      color: ["#811948", "#e22379"],
                    },
                    label: "EC",
                    labelStyle: {
                      transform: "translateX(-50px)",
                    },
                  },
                ]}
                series={[{ dataKey: "ec" }]}
                dataset={chartData}
                width={1200}
                height={400}
                margin={{ left: 100, right: 30, top: 30, bottom: 30 }}
                grid={{ vertical: true, horizontal: true }}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ p: 2, boxShadow: 3, m: 5, borderRadius: 5 }}>
          <CardHeader title="Number of caps" />
          <CardContent>
            <Box display="flex" justifyContent="center">
              <BarChart
                xAxis={[{ dataKey: "id", scaleType: "band" }]}
                yAxis={[
                  {
                    colorMap: {
                      type: "continuous",
                      min: -10,
                      max: 10,
                      color: ["#811948", "#e22379"],
                    },
                  },
                ]}
                series={[{ dataKey: "fcc" }, { dataKey: "fcr" }]}
                dataset={barchartData}
                width={1200}
                height={400}
                margin={{ left: 100, right: 30, top: 30, bottom: 30 }}
                grid={{ vertical: true, horizontal: true }}
              />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
