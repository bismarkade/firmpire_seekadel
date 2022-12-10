import { makeStyles } from '@mui/styles';


const drawerWidth = 240;
// theme is a special mui function --
//but we must the entire appliaiton with it in order to use

export default makeStyles((theme) => ({
   toolbar: {
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '240px',
        // stype based on device : 
        [theme.breakpoints.down('sm')]:{
            // styles here for devices higher than sm
            marginLeft: 0, // appy on --desktop device
            flexWrap: 'wrap', 
        },
   },
   menuButton: {
        marginRight: theme.spacing(2),

        // stype based on device : 
        [theme.breakpoints.up('sm')]:{
            // styles here for devices higher than sm
            display: 'none', // hide the menu on none mobile devices, eg--desktop 
        },
   },
   drawer: {
     [theme.breakpoints.up('sm')]:{
        width: drawerWidth,
        flexShrink: 0, 
     },
   },
   drawerpaper:{
        width: drawerWidth,
   },
   linkButton: {
    '&:hover' : {
        color: 'white !important',
        testDecoration: 'none',
    },
   },
}));

