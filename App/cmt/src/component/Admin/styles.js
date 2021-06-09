import { makeStyles, fade } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    //Dashboard Title
    adminTitle:{
        display:'flex',
        marginLeft:30.
    },
    adminTitleh1:{
        color:'#ffcc00',
        fontSize:40
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
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}))