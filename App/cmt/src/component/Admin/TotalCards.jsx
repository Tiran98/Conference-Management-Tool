import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import useStyles from './styles';

const TotalCards = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.totalCard}>
                <div className={classes.cardMargin}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent style={{display:'flex'}}>
                                <GroupIcon style={{color:'#ffcc00'}}></GroupIcon>
                                <Typography className={classes.title} style={{marginLeft:10}} variant="h3">
                                Total Registrations
                                </Typography>
                                <Typography style={{marginLeft:10, marginTop:-3}} className={classes.cardCount}>
                                300
                                </Typography>
                            </CardContent>
                        </CardActionArea>    
                    </Card>
                </div>
                <div className={classes.cardMargin}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent style={{display:'flex'}}>
                                <MonetizationOnIcon style={{color:'#ffcc00'}}></MonetizationOnIcon>
                                <Typography className={classes.title} style={{marginLeft:10}} variant="h3">
                                Total Revenue
                                </Typography>
                                <Typography style={{marginLeft:10, marginTop:-3}} className={classes.cardCount}>
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