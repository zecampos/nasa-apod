import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment/locale/pt-br";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import TheModal from "../../components/TheModal";
import { getDays } from "../../services/getDate";
import { setPics, addFavoritos, removeFavoritos } from "../../store/ducks/pics";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootGridPictures: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
  },
  gridMain: {
    paddingRight: 50,
    paddingLeft: 50,
  },
  firstItem: {
    marginTop: 100,
  },
  firstText: {
    fontFamily: "RedHatDisplay-Regular",
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
  },
  secondItem: {
    marginTop: 20,
  },
  itemLoading: {
    heigth: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  title: {
    fontFamily: "Amiri-Bold",

    color: "#006572",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  titleImage: {
    color: "rgba(255,255,255,1)",
  },
  titleBar: {
    backgroundColor:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "#FFF",
  },
  iconFavoritado: {
    color: "#D4AF37",
  },
}));

export default function Home() {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:920px)");

  const pics = useSelector((state) => state.pics.pics);
  const favoritos = useSelector((state) => state.pics.favoritos);
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    moment().subtract(7, "days").format("YYYY-MM-DD")
  );

  const [days, setDays] = React.useState(7);
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [selectedPic, setSelectedPic] = React.useState({});
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  useEffect(() => {
    (async function getImages() {
      setLoading(true);
      const d = await getDays(days);
      d.forEach((item, index) => {
        const eFavorito = favoritos.filter((f) => f.date === item.date);
        if (eFavorito.length > 0) {
          item.favorito = true;
        }
      });
      setNewPics(d);

      setLoading(false);
    })();
  }, [days]);

  function setNewPics(pics) {
    dispatch(setPics(pics));
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const today = moment();
    const d = today.diff(date, "days");
    setDays(d);
  };

  function handleSelectedPic(pic) {
    setSelectedPic(pic);
    setModal(true);
  }

  function handleAddFavorites(pic) {
    dispatch(addFavoritos(pic));
    setSnackbarOpen(true);
    setMsg(`Imagem do dia ${pic.dateBr} adicionada aos favoritos`);
  }

  function handleRemoveFavorites(pic) {
    dispatch(removeFavoritos(pic));
    setSnackbarOpen(true);
    setMsg(`Imagem do dia ${pic.dateBr} removida aos favoritos`);
  }
  function renderMedia(media) {
    if (media.media_type === "image") {
      return <img src={media.url} alt={media.title} />;
    } else if (media.media_type === "video") {
      return (
        <>
          <iframe
            title={media.title}
            width="100%"
            height="315"
            src={media.url}
          ></iframe>
        </>
      );
    }
  }
  return (
    <div className={classes.root}>
      <Grid container className={classes.gridMain}>
        <Grid
          className={classes.firstItem}
          item
          xs={12}
          lg={12}
          sm={12}
          xl={12}
        >
          <Typography className={classes.firstText} component="span">
            Bem vindo a Galeria de fotos da Nasa
          </Typography>
        </Grid>
        <Grid
          className={classes.secondItem}
          item
          sm={12}
          xs={12}
          md={8}
          lg={8}
          xl={8}
        >
          <Typography
            style={{ fontSize: matches ? 22 : 40 }}
            className={classes.title}
            component="span"
          >
            Imagem Da Astronomia Do Dia.
          </Typography>
        </Grid>
        <Grid
          className={classes.secondItem}
          item
          sm={12}
          xs={12}
          md={4}
          lg={4}
          xl={4}
        >
          <MuiPickersUtilsProvider
            locale="pt-br"
            libInstance={moment}
            utils={MomentUtils}
          >
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableFuture
                format="DD/MM/yyyy"
                margin="normal"
                id="date-picker-dialog"
                label="Últimos 7 dias"
                helperText="Selecione uma data mais antiga"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        {loading ? (
          <Grid item xs={12}>
            <LinearProgress
              style={{
                alignSelf: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            />
          </Grid>
        ) : (
          <div className={classes.rootGridPictures}>
            <GridList
              cellHeight={matches ? 300 : 200}
              className={classes.gridList}
              cols={matches ? 1 : 3}
            >
              {pics.map((tile) => (
                <GridListTile key={tile.title} cols={tile.cols || 1}>
                  {renderMedia(tile)}
                  <GridListTileBar
                    title={tile.title.substring(0, 40)}
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                    }}
                    classes={{
                      root: classes.titleBar,
                      // title: classes.titleImage,
                    }}
                    subtitle={tile.dateBr}
                    // subtitle={<span>by: {tile.copyright}</span>}
                    actionIcon={
                      <>
                        {!matches ? (
                          <IconButton
                            onClick={() => handleSelectedPic(tile)}
                            aria-label={`star ${tile.title}`}
                            color="inherit"
                          >
                            <VisibilityIcon className={classes.icon} />
                          </IconButton>
                        ) : null}
                        {tile.favorito ? (
                          <IconButton
                            onClick={() => handleRemoveFavorites(tile)}
                            aria-label={`star ${tile.title}`}
                            color="inherit"
                          >
                            <StarBorderIcon
                              className={classes.iconFavoritado}
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => handleAddFavorites(tile)}
                            aria-label={`star ${tile.title}`}
                            color="inherit"
                          >
                            <StarBorderIcon className={classes.icon} />
                          </IconButton>
                        )}
                      </>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        )}
      </Grid>
      <TheModal modal={modal} setModal={setModal} pic={selectedPic} />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={setSnackbarOpen}
        message={msg}
      />
    </div>
  );
}
