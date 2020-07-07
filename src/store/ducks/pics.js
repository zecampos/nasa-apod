export const Types = {
  ADDFAVORITOS: "pics/ADDFAVORITOS",
  REMOVEFAVORITOS: "pics/REMOVEFAVORITOS",
  SETPICS: "pics/SETPICS",
};

const initialState = {
  favoritos: [],
  pics: [],
};

export default function pics(state = initialState, action) {
  switch (action.type) {
    case Types.ADDFAVORITOS:
      return {
        ...state,
        favoritos: [...state.favoritos, action.payload.pic],
        pics: state.pics.map((pic) =>
          pic.date === action.payload.pic.date
            ? { ...pic, favorito: true }
            : pic
        ),
      };
    case Types.REMOVEFAVORITOS:
      return {
        ...state,
        favoritos: state.favoritos.filter(
          (pic) => pic.date !== action.payload.pic.date
        ),
        pics: state.pics.map((pic) =>
          pic.date === action.payload.pic.date
            ? { ...pic, favorito: undefined }
            : pic
        ),
      };
    case Types.SETPICS:
      return {
        ...state,
        pics: action.payload.pics,
      };

    default:
      return state;
  }
}

export const addFavoritos = (pic) => ({
  type: Types.ADDFAVORITOS,
  payload: {
    pic,
  },
});
export const removeFavoritos = (pic) => ({
  type: Types.REMOVEFAVORITOS,
  payload: {
    pic,
  },
});
export const setPics = (pics) => ({
  type: Types.SETPICS,
  payload: {
    pics,
  },
});
