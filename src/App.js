import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import Search from "./components/Search/Search";

import { CssBaseline, Grid } from "@material-ui/core";
import Sidebar from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import { Player } from "./components/Player/Player";
import { Liked } from "./components/Liked/Liked";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { themes } from "./utils/Theme/Theme";
import { CreatePlaylist } from "./components/Playlist/CreatePlaylist";
import SongDetails from "./components/Song/SongDetails";
import PlaylistView from "./components/Playlist/PlaylistView";
import { useLogin } from "./context";
import { Toaster } from "react-hot-toast";
import { Library } from "./components/Library/Library";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
  const { userState, userDispatch } = useLogin();

  const preferredTheme = userState?.theme ? userState?.theme : "light"; //"light"; //user.theme;

  const theme = createTheme(themes[preferredTheme]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Toaster />
        <Switch>
          {/* <Route path="/" component={Dashboard} exact /> */}
          <Route path="/signin" component={SignIn} exact />
          <Route path="/signup" component={SignUp} exact />

          <Grid
            container
            style={
              {
                // height: "100vh",
                // overflow: "hidden"
              }
            }
          >
            <Grid item xs={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={10} style={{ margin: "0 auto" }}>
              <Header />
              <PrivateRoutes path="/" component={Dashboard} exact />
              <PrivateRoutes path="/song/:id" component={SongDetails} exact />

              <PrivateRoutes path="/search" component={Search} exact />
              <PrivateRoutes path="/lib" component={Library} exact />

              <PrivateRoutes
                path="/createPlay"
                component={CreatePlaylist}
                exact
              />
              <PrivateRoutes
                path="/playlist/:id"
                component={PlaylistView}
                exact
              />

              <PrivateRoutes path="/liked" component={Liked} exact />
            </Grid>
            <Grid
              style={{ width: "100%", position: "absolute", bottom: "0px" }}
            >
              <Player />
            </Grid>
          </Grid>

          <Route path="" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
