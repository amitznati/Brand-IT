import React from 'react';
import {Grid, Typography, Card} from "@material-ui/core";
import DynamicTextOptionsFields from "./DynamicTextOptionsFields";
import {TemplatePreviewForPreview} from 'template-editor';
import {Loading, useQueryWithStore} from "react-admin";
import ThemeSelect from "../commonComponents/ThemeSelect";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(2)
        }
    }),
);

export default function SelectBrand({selectedCategory}) {
    const [dynamicTextOptions, setDynamicTextOptions] = React.useState<Array<string>>([]);
    const [selectedTheme, setSelectedTheme] = React.useState();
    const [maxTemplatesLength, setMaxTemplatesLength] = React.useState(0);
    const [products, setProducts] = React.useState<Array<any>>([]);
    const [dynamicTextValues, setDynamicTextValues] = React.useState({});
    const classes = useStyles();
    const { loading } = useQueryWithStore(
        {
            type: 'getProductsWithTemplates',
            resource: 'Products',
            payload: { categories: [selectedCategory] },
        },
        {
            onSuccess: ({ data }) => {
                const dynOptions: Array<string> = [];
                const dynValues = {'Brand Name': 'Brand Name', Slogan: 'some slogan for logo'};
                let maxTemplatesSize = 0;
                data.forEach(product => {
                    if (product.categories.includes(selectedCategory)) {
                        maxTemplatesSize = Math.max(maxTemplatesSize, product.templates.length);
                        if (product.dynamicTextOptions &&
                            product.dynamicTextOptions.length) {
                            product.dynamicTextOptions.forEach(textOption => {
                                if (!dynOptions.includes(textOption)) {
                                    dynOptions.push(textOption);
                                    dynValues[textOption] = textOption;
                                }
                            });
                        }
                    }
                });
                setDynamicTextOptions(dynOptions);
                setDynamicTextValues(dynValues);
                setProducts(data);
                setMaxTemplatesLength(maxTemplatesSize);
            }
        }
    );
    // React.useEffect(() => {
    //     const dynOptions: Array<string> = [];
    //     const dynValues = {};
    //     let maxTemplatesSize = 0;
    //     data.forEach(product => {
    //         if (product.categories.includes(selectedCategory)) {
    //             maxTemplatesSize = Math.max(maxTemplatesSize, product.templates.length);
    //             if (product.dynamicTextOptions &&
    //                 product.dynamicTextOptions.length) {
    //                 product.dynamicTextOptions.forEach(textOption => {
    //                     if (!dynOptions.includes(textOption)) {
    //                         dynOptions.push(textOption);
    //                         dynValues[textOption] = textOption;
    //                     }
    //                 });
    //             }
    //         }
    //     });
    //     setDynamicTextOptions(dynOptions);
    //     setDynamicTextValues(dynValues);
    //     setProducts(data);
    //     setMaxTemplatesLength(maxTemplatesSize);
    // }, [loading]);
    if (loading) return <Loading />;
    const renderProducts = () => {
        const kits: Array<Array<{product: any, template: any}>> = [];
        for (let i = 0; i < maxTemplatesLength; i++) {
            const productTemplate: Array<{product: any, template: any}> = [];
            products.forEach((product) => {
                if (product.templates[i]) {
                    productTemplate.push({
                        product,
                        template: {
                            template: JSON.parse(product.templates[i].template),
                            id: product.templates[i].id
                        }
                    });
                }
            });
            kits.push(productTemplate);
        }
        return kits.map((productTemplate, index) => {
           return (
               <Grid item xs={6} key={`kit-${index}`}>
                   <Card className={classes.card}>
                       <Grid container alignItems="center">
                           {productTemplate.map(({product, template}) => {
                               return (
                                   <Grid item xs={3} key={[product.id, template.id].join('-')}>
                                       <TemplatePreviewForPreview
                                           {...{
                                               selectedTheme,
                                               product,
                                               dynamicTextValues
                                           }}
                                           scale={0.15}
                                           template={template.template}
                                           isActiveTextValues
                                       />
                                   </Grid>
                               );
                           })}
                       </Grid>
                   </Card>
               </Grid>

           );
        });
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <DynamicTextOptionsFields
                    dynamicTextOptions={dynamicTextOptions}
                    setDynamicTextValues={setDynamicTextValues}
                    dynamicTextValues={dynamicTextValues}
                />
            </Grid>
            <Grid item xs={12}><Typography component="h6">Theme Select</Typography></Grid>
            <Grid item xs={12}>
                <ThemeSelect onSelect={setSelectedTheme} selectedTheme={selectedTheme} />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {renderProducts()}
                </Grid>
            </Grid>
        </Grid>
    );
}
