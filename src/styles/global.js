import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box;
    @import url('./fonts/RedHatDisplay-Regular.ttf');
    @import url('./fonts/Amiri-Bold.ttf');
}
html, body, #root{
    min-height:100%;
}


`;
