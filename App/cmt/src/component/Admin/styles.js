import { makeStyles, fade, useTheme, withStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    //Dashboard Title
    adminTitle:{
        display:'flex',
        marginLeft:30,
        marginTop:30
    },
    adminTitleh1:{
        color:'#ffcc00',
        fontSize:40,
    },
    adminTitleh:{
        fontSize:40
    },
    //Card Content
    totalCard:{
        display:'flex',
    },
    cardMargin:{
        marginLeft:30
    },
    root: {
        width:300,
        backgroundColor:'#171717',
        display:'flex',
    },
    title: {
        fontSize: 22,
        color:'#ffcc00'
    },
    cardCount:{
        fontSize: 22,
        color:'#ffffff'
    },
    //tabPanel 
    tabroot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 250,
        width: 630,
        marginLeft:30,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    //Editor Request Panel
    Reqroot: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
    //EditorCards
    Cardroot: {
        minWidth: 275,
        backgroundColor:'#e9ecef'
    },
    Cardbullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    Cardtitle: {
        fontSize: 16,
    },
    Cardpos: {
        marginBottom: 12,
    },
    //buttons
    buttonDone: {
        margin: theme.spacing(1),
        marginLeft:-20,
        marginTop:-5,
        color:'#000000',
        backgroundColor:'#00ff00'
    },
    buttonDecline: {
        margin: theme.spacing(1),
        color:'#000000',
        backgroundColor:'#cc3300',
        marginLeft:100,
        marginTop:-35
    },
    //conferenceSelector
    margin: {
        margin: theme.spacing(1),
    },
}))