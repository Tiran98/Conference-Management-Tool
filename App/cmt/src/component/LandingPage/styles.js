import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {

    },
    conferenceTitle: {
        fontWeight: 600,
        textAlign: 'right',
        color: '#ffffff'
    },
    paperTitle: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#23212c',
        padding: theme.spacing(3),
        marginBottom: theme.spacing(4),
    },
    conferenceVenue: {
        fontWeight: 500,
        textAlign: 'right',
        color: '#FFB101'
    },
    paperDetails: {
        backgroundColor: '#ffffff',
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    paperKeynotes: {
        backgroundColor: '#ffffff',
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    paperDetail: {
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        marginTop: theme.spacing(2),
    },
    avaterImage: {
        width: 110,
        borderRadius: 5,
        marginRight: 20,
    }
}));