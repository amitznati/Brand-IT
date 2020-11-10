import * as React from "react";
import { Query, Loading, Error } from 'react-admin';
import {Grid} from "@material-ui/core";
import {TemplatePreviewForPreview} from 'template-editor';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const TemplatesGrid = props => {
    const {product, selectedTheme} = props;
    const {templates} = product;
    if (!templates || !templates.length) {
        return <div />;
    }
    return (
        <Grid container spacing={2}>
            {templates.map((template) => {
                return (
                    <Grid key={template.id} item xs={3}>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <TemplatePreviewForPreview
                                        selectedTheme={selectedTheme}
                                        scale={0.4}
                                        product={product}
                                        template={JSON.parse(template.template)}
                                    />
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    )
}


const ProductTemplatesPreview = (props) => {
    const { record, selectedTheme } = props;
    return (
        <Query type='getProductWithTemplates' resource='Product' payload={{id: record.id}}>
            {({data, loading, error}) => {
                if (loading) {
                    return <Loading/>;
                }
                if (error) {
                    return <Error/>;
                }
                return <TemplatesGrid product={data} selectedTheme={selectedTheme} />;
            }}
        </Query>
    );
};

export default ProductTemplatesPreview;
