import { makeStyles, fade, useTheme, withStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    adminTitle:{
        display:'flex',
        marginLeft:30,
        marginTop:50
    },
    adminTitleh1:{
        color:'#ffcc00',
        fontSize:40,
    },
    adminTitleh:{
        fontSize:40
    },
    //table
    root: {
        marginLeft:80,
        width: '90%',
    },
    container: {
        maxHeight: 440,
    },
}))