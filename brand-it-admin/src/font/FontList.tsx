import * as React from "react";
import { useListContext } from 'react-admin';
import FontProvider from "../commonComponents/FontProvider";
import {Grid} from "@material-ui/core";


const FontList = () => {
    const { ids, data, /* basePath */ } = useListContext();
    if (!data) {
        return <div>Loading...</div>;
    }
    const fontFamilies: Array<{fontFamily: string, src: string}> = ids.map((id) => ({
        src: `url(${data[id].url}) format("woff2")`,
        fontFamily: data[id].name
    }));
    return (
        <FontProvider fontFamilies={fontFamilies}>
            <Grid container>
                {ids.map((id) => {
                    const font = data[id];
                    return (
                        <Grid key={id} item xs={12} >
                            {font.name}
                            <span style={{fontFamily: font.name, fontSize: '4rem'}}>
                                ABCDEFabcde0123456789
                            </span>
                        </Grid>
                    );
                })}
            </Grid>
        </FontProvider>
    );
}
export default FontList;
