import React from 'react';
import {Grid, TextField, Typography} from "@material-ui/core";

const DynamicTextOptionsFields = ({dynamicTextOptions, dynamicTextValues, setDynamicTextValues}) => {
    return (
        <Grid container>
            <Grid item xs={12}><Typography component="h6">Dynamic Text Options</Typography></Grid>
            {dynamicTextOptions.map((textOption) => {
                return (
                    <Grid key={textOption} item xs={4}>
                        <TextField
                            label={textOption}
                            value={dynamicTextValues[textOption]}
                            onChange={(e) =>
                                setDynamicTextValues({...dynamicTextValues, [textOption]: e.target.value})
                            }
                        />
                    </Grid>
                );
            })}
        </Grid>
    )
};

export default DynamicTextOptionsFields;
