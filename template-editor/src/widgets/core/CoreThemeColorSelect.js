import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
// import FolderIcon from '@material-ui/icons/Folder';
// import RestoreIcon from '@material-ui/icons/Restore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  label: { padding: '1rem' },
  buttonsGroup: { display: 'flex' }
});
const themeColors = [
  { key: 'none', label: 'none' },
  { key: '@theme-color-primary', label: 'primary' },
  { key: '@theme-color-secondary', label: 'secondary' },
  { key: '@theme-color-tertiary', label: 'tertiary' }
];
export default function CoreThemeColorSelect({ value, onSelect }) {
  const classes = useStyles();

  return (
    <Paper>
      <span className={classes.label}>Theme Color Select</span>
      <div className={classes.buttonsGroup}>
        {themeColors.map((themeColor) => {
          const isNone = themeColor.key === 'none';
          const btnProps = {
            onClick: () => onSelect(isNone ? '' : themeColor.key)
          };
          if (value === themeColor.key || (isNone && !value)) {
            btnProps.variant = 'outlined';
            btnProps.color = 'primary';
          }
          return (
            <Button key={themeColor.key} {...btnProps}>
              {themeColor.label}
            </Button>
          );
        })}
      </div>
    </Paper>
  );
}
