import { makeStyles, fade, useTheme, withStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    adminTitle:{
        display:'flex',
        marginLeft:10,
        marginTop:10
    },
    adminTitleh1:{
        color:'#ffcc00',
        fontSize:40,
    },
    adminTitleh:{
        fontSize:40
    },
    //text Areas
    root: {
        margin: theme.spacing(1),
        marginLeft:30,
    },
    //password
    passwordText: {
        width:500
    },
    //confirm Password
    confirmPasswordText: {
        width:372
    },
    //Add Conference Button
    addConfBtn:{
        width:900,
        marginLeft:60
    }

}))