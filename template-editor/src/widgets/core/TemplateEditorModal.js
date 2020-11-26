import React from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import EditTemplateMainViewComponent from '../EditTemplateMainView/widget/EditTemplateMainView.connect';
import { getInstance } from '../../sdk';
const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  }
});
const EditTemplateDialog = ({
  onClose,
  open,
  onSaveTemplate,
  initialData,
  template
}) => {
  const classes = useStyles();
  return (
    <Dialog
      onClose={onClose}
      disableEnforceFocus
      fullScreen
      open={open}
      aria-labelledby='Edit-Template-Dialog'
    >
      <DialogTitle id='Edit-Template-Dialog'>
        <AppBar position='static'>
          <Toolbar>
            <IconButton color='inherit' onClick={onClose} aria-label='Close'>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' color='inherit'>
              SVG Edit Template
            </Typography>
            <div className={classes.grow} />
            <IconButton
              color='inherit'
              onClick={() => onSaveTemplate(template)}
            >
              <Icon>save</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </DialogTitle>
      <DialogContent>
        <EditTemplateMainViewComponent initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
};

const editTemplateMainViewApi = getInstance().EditTemplateMainViewApi;

const mapStateToProps = (state, props) => {
  const template = editTemplateMainViewApi.getTemplateSelector();
  return {
    template,
    ...props
  };
};

const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(EditTemplateDialog);
