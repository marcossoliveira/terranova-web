import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
// eslint-disable-next-line import/named
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClassIcon from '@mui/icons-material/Class';
import ViewListIcon from '@mui/icons-material/ViewList';
import HomeIcon from '@mui/icons-material/Home';
import Content from './Content.tsx';
import { ThemeOptions } from '../../../../constants.ts';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Container,
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { drawerStyle, toolbarStyle } from './styles.ts';
import { DarkMode, LightMode } from '@mui/icons-material';
import { GroupedArticlesModel } from '../../../../models/grouped-articles-model.ts';
import { useState } from 'react';
import { ArticleModel } from '../../../../models/article-model.ts';
import { staticArticle } from '../../../../common/constants/static-article.ts';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface PageWrapProps {
  theme: ThemeOptions;
  setTheme: (theme: ThemeOptions) => void;
  groupedArticles: GroupedArticlesModel[];
}

const PageWrap: React.FC<PageWrapProps> = ({
  theme,
  setTheme,
  groupedArticles,
}) => {
  const pageTheme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [article, setArticle] = useState<ArticleModel>(staticArticle);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  const groupedList = (item: GroupedArticlesModel) => {
    return (
      <Accordion key={item.articleCategory.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ViewListIcon /> {item.articleCategory.name}
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {item.articles.map((a) => (
              <ListItem key={a.id} disablePadding>
                <ListItemButton onClick={() => setArticle(a)}>
                  <ListItemIcon>
                    <ClassIcon />
                  </ListItemIcon>
                  <ListItemText primary={a.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar style={{ ...toolbarStyle }}>
          <div style={{ ...drawerStyle }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Terra Nova - Wiki
            </Typography>
          </div>
          <IconButton onClick={changeTheme} color="inherit">
            {theme === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {pageTheme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setArticle(staticArticle)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Início'} />
            </ListItemButton>
          </ListItem>
          <Divider />
          {groupedArticles.map((item: GroupedArticlesModel) =>
            groupedList(item),
          )}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              {groupedArticles.find(
                (item) => item.articleCategory.id === article.category,
              )?.articleCategory.name ?? ''}
            </Link>
            <Typography color="text.primary">{article.title}</Typography>
          </Breadcrumbs>
        </Container>
        <Content article={article} />
      </Main>
    </Box>
  );
};

export default PageWrap;
