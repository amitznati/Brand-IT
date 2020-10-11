import React from 'react';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { useListContext } from 'react-admin';
import {Grid} from "@material-ui/core";
import LogoCard from "./LogoCard";

const useStyles = makeStyles(theme => ({
    gridList: {
        margin: 0,
    },
    itemWrap: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
    },
    tileBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
    },
    placeholder: {
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
    price: {
        display: 'inline',
        fontSize: '1em',
    },
    link: {
        color: '#fff',
    },
    image: {
        maxWidth: '6rem',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

const getColsForWidth = (width) => {
    if (width === 'xs') return 2;
    if (width === 'sm') return 3;
    if (width === 'md') return 4;
    if (width === 'lg') return 5;
    return 6;
};

const times = (nbChildren, fn) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = ({
                             width,
                             nbItems = 20,
                         }) => {
    const classes = useStyles();
    return (
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}
            className={classes.gridList}
        >
            {' '}
            {times(nbItems, key => (
                <GridListTile key={key}>
                    <div className={classes.placeholder} />
                </GridListTile>
            ))}
        </MuiGridList>
    );
};

const LoadedGridList = () => {
    const { ids, data } = useListContext();

    if (!ids || !data) return null;

    return (
        <Grid container>
            {ids.map((id) => {
                const icon = data[id];
                return (
                    <Grid item sm={6} md={3} key={id}>
                        <LogoCard icon={icon} />
                    </Grid>
                )
            })}
        </Grid>
    );
};


const GridList = ({ width }) => {
    const { loaded } = useListContext();
    return loaded ? (
        <LoadedGridList/>
    ) : (
        <LoadingGridList width={width} />
    );
};

export default withWidth()(GridList);
