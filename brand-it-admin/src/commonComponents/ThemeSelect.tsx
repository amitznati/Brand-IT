import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActionArea} from "@material-ui/core";
import {useGetList} from 'react-admin';
import FontProvider from "./FontProvider";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        overflowX: 'auto',
        height: '15rem',
        margin: '2rem 0'
    },
    themeWrap: {
        width: '15rem',
        margin: '1rem',
    },
    themeActionArea: {
        backgroundSize: "cover",
        textAlign: "center",
        padding: '.5rem',
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        height: '100%'
    },
    primaryFont: {
        fontSize: 30
    },
    secondaryFont: {
        fontSize: 20
    },
    tertiaryFont: {
        fontSize: 16
    },
    colorsWrap: {

    },
    paletteColor: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem',
        height: '2rem',
        width: '2rem',
        color: '#fff',
        borderRadius: '50%',
        fontSize: 10
    }
});

export default function ThemeSelect({onSelect, selectedTheme}) {
    const classes = useStyles();
    const { data, ids, loading } = useGetList(
        'Theme',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' }
    );
    if (loading) return <div>Loading...</div>;
    const themes = ids.map(id => data[id]);
    const fontFamilies: Array<{fontFamily: string, src: string}> = [];
    themes.forEach((theme) => {
        ['primary', 'secondary', 'tertiary'].forEach((fontType) => {
            theme.fontFamilies[fontType] && fontFamilies.push(
                {
                    fontFamily: `${fontType}${theme.id}`,
                    src:`url(${theme.fontFamilies[fontType]}) format("woff2")`
                });
        });
    });
    return (
        <div className={classes.root}>
            <FontProvider fontFamilies={fontFamilies}>
                {themes.map((theme) => {
                    const selectedThemeStyle = {margin: '1rem'};
                    if (selectedTheme && selectedTheme.id === theme.id) {
                        selectedThemeStyle.margin = '0';
                    }
                    return (
                        <Card
                            key={theme.id}
                            className={classes.themeWrap}
                            style={{
                                ...selectedThemeStyle
                            }}
                        >
                            <CardActionArea
                                onClick={() => onSelect(theme)}
                                className={classes.themeActionArea}
                                style={{
                                    backgroundImage: `url(${theme.images.bg})`,
                                }}
                            >
                                <div>
                                    {theme.fontFamilies.primary &&
									<div
										className={classes.primaryFont}
										style={{fontFamily: `primary${theme.id}`}}>
                                        {theme.name}
									</div>
                                    }
                                    {theme.fontFamilies.secondary &&
									<div
										className={classes.secondaryFont}
										style={{fontFamily: `secondary${theme.id}`}}>
										secondary font
									</div>
                                    }
                                    {theme.fontFamilies.tertiary &&
									<div
										className={classes.tertiaryFont}
										style={{fontFamily: `tertiary${theme.id}`}}>
										tertiary font
									</div>
                                    }
                                </div>
                                <div className={classes.colorsWrap}>
                                    <div style={{backgroundColor: theme.palette.primary}} className={classes.paletteColor} >Primary</div>
                                    <div style={{backgroundColor: theme.palette.secondary}} className={classes.paletteColor} >Secondary</div>
                                    <div style={{backgroundColor: theme.palette.tertiary}} className={classes.paletteColor} >Tertiary</div>
                                </div>
                            </CardActionArea>

                        </Card>
                    );
                })}
            </FontProvider>
        </div>
    )
}
