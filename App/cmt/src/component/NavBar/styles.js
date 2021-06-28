import { makeStyles, fade } from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#ffffff",
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: '0 5px 3px -3px rgba(0, 0, 0, 0.40)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        // [theme.breakpoints.up('sm')]: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        //     marginLeft: drawerWidth,
        // },
    },
    menuButton: {
        marginLeft: theme.spacing(1),
    },
    hide: {
        display: 'none',
    },
    drawerIcon: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    title: {
        flexGrow: 1,
        alignItems: 'center',
        display: 'flex',
        textDecoration: 'none',
    },
    image: {
        marginRight: '10px',
    },
    button: {
        marginLeft: '10px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1,
    },
    profile: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            marginTop: 20,
            justifyContent: 'flex-end',
        },
    },
    profileType: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-end',
    },
    logout: {
        marginLeft: '20px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '12pt',
    },
    userType: {
        display: 'flex',
        alignItems: 'end',
        textAlign: 'right',
    },
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
        fontWeight: 800,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(5),
        backgroundColor: '#ededed',
    },
    listItem: {
        fontWeight: "800",
    },
    bottomPush: {
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        paddingBottom: 10,
    },
    footer: {
        fontSize: 10,
        paddingLeft: 10,
    }
}));