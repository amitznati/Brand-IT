import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        margin: '0.5rem'
    },
    imageWrap: {
        height: '9rem',
        position: 'relative',
        backgroundImage: 'linear-gradient(#00000063, #00000012);'
    },
    image: {
        maxHeight: '8rem',
        maxWidth: '8rem',
        transform: 'translate(-50%, -40%)',
        top: '40%',
        left: '50%',
        position: 'absolute'
    }
});

export default function LogoCard({icon}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea href={`#/Icon/${icon.id}`}>
                <CardContent>
                    {/*<div className={classes.imageWrap}>*/}
                    {/*    <img src={icon.imageUrl} alt="" className={classes.image}/>*/}
                    {/*</div>*/}
                    <Typography gutterBottom variant="h5" component="h2">
                        {icon.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button href={`#/Icon/${icon.id}/edit`} size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}
