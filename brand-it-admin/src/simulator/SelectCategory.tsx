import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useGetList, Loading} from "react-admin";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export default function SelectCategory({onSelectCategory, selectedCategory}) {
    const classes = useStyles();
    const [selectedBusiness, setSelectedBusiness] = React.useState('');
    React.useEffect(() => {
        if (selectedCategory) {
            setSelectedBusiness(categoriesData[selectedCategory].business.id);
        }
    }, [selectedCategory]);
    const handleBusinessChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedBusiness(event.target.value as string);
    };
    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        onSelectCategory(event.target.value);
    };
    const { data: businessesData, ids: businessesIds, loading: businessesLoading } = useGetList(
        'Business',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' }
    );
    const { data: categoriesData, ids: categoriesIds, loading: categoriesLoading } = useGetList(
        'Category',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' }
    );
    if (businessesLoading || categoriesLoading) {
        return <Loading />;
    }
    // const businesses = businessesIds.map(id => businessesData[id]);
    // const categories = categoriesIds.map(id => categoriesData[id]);
    return (
        <div>
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="businesses-simple-select-outlined-label">Business/Area</InputLabel>
                    <Select
                        labelId="businesses-simple-select-outlined-label"
                        id="businesses-simple-select-outlined"
                        value={selectedBusiness}
                        onChange={handleBusinessChange}
                        label="Business"
                    >
                        {businessesIds.map((id) => {
                            return (
                                <MenuItem key={id} value={id}>{businessesData[id].name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="categories-simple-select-outlined-label">Category</InputLabel>
                    <Select
                        labelId="categories-simple-select-outlined-label"
                        id="categories-simple-select-outlined"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        {categoriesIds.filter(id => categoriesData[id].business.id === selectedBusiness).map((id) => {
                            return (
                                <MenuItem key={id} value={id}>{categoriesData[id].name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}
