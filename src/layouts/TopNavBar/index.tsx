import React from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';

import { useAuthentication } from '@/contexts';
import { useSettings } from '@/hooks';

import { menu } from '../Navigation';

interface NavbarProps {
  children?: React.ReactNode;
}

const NavbarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const TopNavbar: React.FC<NavbarProps> = ({ children }) => {
  const { user, hasAccessPermission } = useAuthentication();
  const { setTheme, theme } = useSettings();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  console.log(user);

  return (
    <>
      <NavbarContainer position="static">
        <Toolbar>
          {/* Ícone de boas-vindas */}
          <Box
            sx={{
              fontSize: isMobile ? '1rem' : '2rem', // Tamanho do ícone responsivo
              color: muiTheme.palette.primary.main, // Cor do ícone
              marginRight: 2, // Espaçamento à direita
            }}
          >
            <EmojiPeopleIcon fontSize="inherit" />
          </Box>

          {/* Menu de navegação */}
          <Box sx={{ flexGrow: 1 }}>
            <List sx={{ display: 'flex', flexDirection: 'row' }}>
              {menu.map((item) => {
                if (
                  !item.roles ||
                  (item.roles && hasAccessPermission(item.roles))
                ) {
                  const Icon = item.icone;
                  return (
                    <ListItem
                      component="a"
                      href={item.url}
                      key={item.url}
                      sx={{
                        padding: '0 16px',
                        display: 'flex',
                        alignItems: 'center', // Alinha ícone e texto verticalmente
                        gap: 1, // Espaçamento entre ícone e texto
                      }}
                    >
                      {Icon && (
                        <ListItemIcon
                          sx={{
                            minWidth: 'auto',
                            color: muiTheme.palette.primary.light,
                          }}
                        >
                          <Icon />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={item.nome}
                        sx={{ color: muiTheme.palette.primary.light }}
                      />
                    </ListItem>
                  );
                }
                return null;
              })}
            </List>
          </Box>
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme === 'light' ? (
              <Brightness4Icon color="primary" />
            ) : (
              <Brightness7Icon />
            )}
          </IconButton>
        </Toolbar>
      </NavbarContainer>
      <ContentContainer>{children}</ContentContainer>
    </>
  );
};

export default TopNavbar;
