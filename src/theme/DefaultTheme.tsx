import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: grey[900]
        },
        secondary:{
            main: '#ffffff'
        }
    },
    typography:{
        fontFamily:[
            'Outfit'
        ].join(','),
    },
})

export {
    defaultTheme
}