import * as React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import { BarChart, LineChart } from "@mui/x-charts";
import { set } from "zod";
import { useSession } from "next-auth/react";
import { Card, Typography } from "@mui/material";

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
    if (status === "authenticated") {
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
      }, 10000);
    }
  }, []);

  return (
    <>
      <Head>
        <title>PROJET INDUSTRIEL</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <LineChart
            xAxis={[{ dataKey: "id" }]}
            series={[{ dataKey: "ec" }]}
            dataset={chartData}
            width={1200}
            height={400}
            margin={{ left: 100, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </Container>
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <BarChart
            xAxis={[{ dataKey: "id", scaleType: "band" }]}
            series={[{ dataKey: "fcc" }, { dataKey: "fcr" }]}
            dataset={barchartData}
            width={1200}
            height={400}
            margin={{ left: 100, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </Container>
      </>
    </>
  );
}
