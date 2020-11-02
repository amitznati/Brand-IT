import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { useListContext } from 'react-admin';
import {Grid, Card, CardContent, withWidth, GridList as MuiGridList, GridListTile } from "@material-ui/core";
import FontProvider from "../commonComponents/FontProvider";

const useStyles = makeStyles(theme => ({
    gridList: {
        margin: 0,
    },
    card: {
        margin: '1rem'
    },
    imageWrap: {
        display: 'inline-flex',
        flexDirection: 'column',
        margin: '1rem'
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
        maxHeight: '4rem',
        maxWidth: '4rem',
    },
    title: {
        fontSize: '4rem'
    },
    paletteColor: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem',
        height: '4rem',
        width: '4rem',
        color: '#fff',
        borderRadius: '50%'
    },
    fontField: {
        fontSize: '2rem'
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

const imagesFields = [
    {label: 'Background', src: 'bg'},
    {label: 'Frame', src: 'frame'},
    {label: 'Side-Left', src: 'sideL'},
    {label: 'Side-Right', src: 'sideR'},
    {label: 'Side-Top', src: 'sideT'},
    {label: 'Side-Bottom', src: 'sideB'}
];

const fontFields = [
    {type: 'primary', text: 'Primary font example'},
    {type: 'secondary', text: 'Secondary font example'},
    {type: 'tertiary', text: 'Tertiary font example'}
];

const LoadedGridList = () => {
    const { ids, data, /* basePath */ } = useListContext();
    const classes = useStyles();

    if (!ids || !data) return null;
    const fontFamilies: Array<{fontFamily: string, src: string}> = [];
    ids.forEach((id) => {
        fontFields.forEach((fontType) => {
            data[id].fontFamilies[fontType.type] && fontFamilies.push(
                {
                    fontFamily: `${fontType.type}${id}`,
                    src:`url(${data[id].fontFamilies[fontType.type]}) format("woff2")`
                });
        });
    })
    return (
        <Grid container>
            <FontProvider fontFamilies={fontFamilies}>
                {ids.map((id) => {
                    const item = data[id];
                    return (
                        <Grid key={id} item sm={12} md={6}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <span style={{fontFamily: `primary${id}`}} className={classes.title}>{item.name}</span>
                                    <div>
                                        <p>Images</p>
                                        {imagesFields.map((field) => {
                                            return (
                                                <span key={field.src} className={classes.imageWrap}>
                                                <span>{field.label}</span>
                                                <img src={item.images[field.src]} alt={field.label} className={classes.image} />
                                            </span>)
                                        })}
                                    </div>
                                    <div>
                                        <p>Palette</p>
                                        <div style={{backgroundColor: item.palette.primary}} className={classes.paletteColor} >Primary</div>
                                        <div style={{backgroundColor: item.palette.secondary}} className={classes.paletteColor} >Secondary</div>
                                        <div style={{backgroundColor: item.palette.tertiary}} className={classes.paletteColor} >Tertiary</div>
                                    </div>
                                    <div>
                                        <p>Fonts</p>
                                        {fontFields.map((font) => {
                                            return (
                                                <div key={font.type} style={{fontFamily: `${font.type}${id}`}} className={classes.fontField}>
                                                    {item.fontFamilies[font.type] ? font.text : `No ${font.type} font`}
                                                </div>)
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </FontProvider>
        </Grid>
    );
};


const GridList = ({ width }) => {
    const { loaded } = useListContext();
    return loaded ? (
        <LoadedGridList />
    ) : (
        <LoadingGridList width={width} />
    );
};

export default withWidth()(GridList);
