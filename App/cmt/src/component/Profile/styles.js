import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    pageTitle: {
        fontWeight: 500,
    },
    paper: {
        backgroundColor: '#ffffff',
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    editBtn: {
        marginTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
    },
    btnGroup: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    radioGoupLabel: {
        color: '#afafaf',
        fontSize: 12,
    },
}));