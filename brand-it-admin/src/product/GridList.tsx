import React from 'react';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { linkToRecord, useListContext } from 'react-admin';
import { Link } from 'react-router-dom';

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

const LoadedGridList = ({ width }) => {
    const { ids, data, basePath } = useListContext();
    const classes = useStyles();

    if (!ids || !data) return null;

    return (
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}
            className={classes.gridList}
        >
            {ids.map((id) => (
                <GridListTile
                    component={Link}
                    key={id}
                    to={linkToRecord(basePath, data[id].id)}
                    className={classes.itemWrap}
                >
                    <img src={data[id].imageUrl} alt="" className={classes.image}/>
                    <GridListTileBar
                        className={classes.tileBar}
                        title={data[id].name}
                        subtitle={
                            <span>
                                {data[id].size.width}x{data[id].size.height},{' '}
                            </span>
                        }
                    />
                </GridListTile>
            ))}
        </MuiGridList>
    );
};


const GridList = ({ width }) => {
    const { loaded } = useListContext();
    return loaded ? (
        <LoadedGridList width={width} />
    ) : (
        <LoadingGridList width={width} />
    );
};

export default withWidth()(GridList);
