import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import "moment/locale/pt-br";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { removeFavoritos } from "../../store/ducks/pics";

import TheModal from "../../components/TheModal";

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
    marginTop: 20,
    width: "100%",
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
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",
  },
  favoritosText: {
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
    color: "#FFF",
  },
}));

export default function Favoritos() {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:920px)");

  const favoritos = useSelector((state) => state.pics.favoritos);
  const classes = useStyles();

  const [modal, setModal] = React.useState(false);
  const [selectedPic, setSelectedPic] = React.useState({});
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  function handleSelectedPic(pic) {
    setSelectedPic(pic);
    setModal(true);
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
            Seus Favoritos
          </Typography>
        </Grid>

        <div className={classes.rootGridPictures}>
          {favoritos.length === 0 ? (
            <>
              <Typography className={classes.favoritosText} component="span">
                Você ainda não possui favoritos...
              </Typography>
            </>
          ) : (
            <GridList
              cellHeight={matches ? 300 : 200}
              className={classes.gridList}
              cols={matches ? 1 : 3}
            >
              {favoritos.map((tile) => (
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

                        <IconButton
                          onClick={() => handleRemoveFavorites(tile)}
                          aria-label={`star ${tile.title}`}
                          color="inherit"
                        >
                          <DeleteIcon className={classes.iconFavoritado} />
                        </IconButton>
                      </>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          )}
        </div>
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
        // action={
        //   <React.Fragment>
        //     <Button color="secondary" size="small" onClick={handleClose}>
        //       UNDO
        //     </Button>
        //     <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        //       <CloseIcon fontSize="small" />
        //     </IconButton>
        //   </React.Fragment>
        // }
      />
    </div>
  );
}
