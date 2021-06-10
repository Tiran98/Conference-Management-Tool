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
    search: {
        flexGrow: 2,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.85),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 1),
        },
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
        height: 40,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            marginTop: 20,
            justifyContent: 'center',
        },
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