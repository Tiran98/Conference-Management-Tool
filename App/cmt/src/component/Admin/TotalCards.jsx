import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const TotalCards = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.totalCard}>
                <div className={classes.cardMargin}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Typography className={classes.title} variant="h3">
                                Total Registrations
                                </Typography>
                                <Typography className={classes.cardCount}>
                                300
                                </Typography>
                            </CardContent>
                        </CardActionArea>    
                    </Card>
                </div>
                <div className={classes.cardMargin}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Typography className={classes.title} variant="h3">
                                Total Revenue
                                </Typography>
                                <Typography className={classes.cardCount}>
                                $300
                                </Typography>
                            </CardContent>
                        </CardActionArea>    
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TotalCards
