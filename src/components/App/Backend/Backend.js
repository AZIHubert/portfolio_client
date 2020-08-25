import { Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import BackendAbout from './BackendAbout';
import BackendAppBar from './BackendAppBar';
import BackendDrawer from './BackendDrawer';
import BackendGeneral from './BackendGeneral';
import BackendImages from './BackendImages';
import BackendUser from './BackendUser';
import BackendWorks from './BackendWorks';
import BackendWorkDetail from './BackendWorkDetail';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const Backend = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return <Box display='flex'>
    <BackendAppBar handleDrawerOpen={handleDrawerOpen} open={open} />
    <BackendDrawer handleDrawerClose={handleDrawerClose} open={open} />
    <Box flexGrow={1} component='main'>
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path='/backend' component={BackendGeneral} />
        <Route exact path='/backend/works' component={BackendWorks} />
        <Route exact path='/backend/works/:workId' component={BackendWorkDetail} />
        <Route exact path='/backend/about' component={BackendAbout} />
        <Route exact path='/backend/images' component={BackendImages} />
        <Route exact path='/backend/settings' component={BackendUser} />
      </Switch>
    </Box>
  </Box>
};

export default Backend;