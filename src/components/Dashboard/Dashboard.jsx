import { CssBaseline, Grid } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { themes } from "../../utils/Theme/Theme";
import { Header } from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { getStorage } from "../../utils/Theme/utilities.js/storageUtil";
import { Player } from "../Player/Player";
import { useEffect } from "react";
import { getAllSongs } from "../../apis/noteServices";
import { useSongs } from "../../context";
import { DashboardContainer } from "./DashboardContainer";

export function Dashboard() {
  const userChoice = getStorage("choice");
  const { songsDispatch } = useSongs();

  const preferredTheme = userChoice?.theme ? userChoice?.theme : "light"; //"light"; //user.theme;
  const theme = createTheme(themes[preferredTheme]);

  useEffect(() => {
    getAllSongs().then(res => {
      songsDispatch({ type: "SET_SONGS", payload: res.data.data });
      songsDispatch({ type: "SET_CURRENT_PLAYLIST", payload: res.data.data });
    });
  }, []);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Grid container style={{ height: "100vh", overflow: "hidden" }}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10} style={{ margin: "0 auto" }}>
            <Header />
            <DashboardContainer />
          </Grid>
          <Grid style={{ width: "100%", position: "absolute", bottom: 0 }}>
            <Player />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
