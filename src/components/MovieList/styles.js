import { makeStyles } from "@mui/styles";


export default makeStyles((theme) => ({
    moviesContianer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'auto',
        // on mobile devices
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center', 
        }
    },
}));