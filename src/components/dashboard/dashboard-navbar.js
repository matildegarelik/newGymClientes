import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon } from '../../icons/menu';
import { Bell as BellIcon } from '../../icons/bell';
import { Search as SearchIcon } from '../../icons/search';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Users as UsersIcon } from '../../icons/users';
import { AccountPopover } from './account-popover';
import { ContactsPopover } from './contacts-popover';
import { ContentSearchDialog } from './content-search-dialog';
import { NotificationsPopover } from './notifications-popover';
import { LanguagePopover } from './language-popover';

/* Barra de Navegación Superior de la Web App de Clientes.
*
* Aquí está tanto la Campana de Notificaciones como el Icono de la Foto de Perfil.
*
* Tengo que modificar el código de la campana de Notificaciones del Top Navbar de la web app de Clientes para que NO
* agarre todas las notificaciones, sino que solo agarre las notificaciones con el mismo ID que el usuario autenticado,
* y las notificaciones de tipo “Cliente”.
* */

const languages = {
  en: '/static/icons/uk_flag.svg',
  de: '/static/icons/de_flag.svg',
  es: '/static/icons/es_flag.svg'
};

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
      boxShadow: theme.shadows[3]
    }
    : {
      backgroundColor: theme.palette.background.paper,
      borderBottomColor: theme.palette.divider,
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      boxShadow: 'none'
    })
}));

/* Icono de la Bandera para cambiar el idioma. Esto no me sirve por los momentos.
* */
// const LanguageButton = () => {
//   const anchorRef = useRef(null);
//   const { i18n } = useTranslation();
//   const [openPopover, setOpenPopover] = useState(false);
//
//   const handleOpenPopover = () => {
//     setOpenPopover(true);
//   };
//
//   const handleClosePopover = () => {
//     setOpenPopover(false);
//   };
//
//   return (
//     <>
//       <IconButton
//         onClick={handleOpenPopover}
//         ref={anchorRef}
//         sx={{ ml: 1 }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             height: 20,
//             width: 20,
//             '& img': {
//               width: '100%'
//             }
//           }}
//         >
//           <img
//             alt=""
//             src={languages[i18n.language]}
//           />
//         </Box>
//       </IconButton>
//       <LanguagePopover
//         anchorEl={anchorRef.current}
//         onClose={handleClosePopover}
//         open={openPopover}
//       />
//     </>
//   );
// };

const ContentSearchButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenSearchDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton
          onClick={handleOpenSearchDialog}
          sx={{ ml: 1 }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContentSearchDialog
        onClose={handleCloseSearchDialog}
        open={openDialog}
      />
    </>
  );
};

/* Icono de "Contacts". Esto no me servirá for the time being. */
// const ContactsButton = () => {
//   const anchorRef = useRef(null);
//   const [openPopover, setOpenPopover] = useState(false);
//
//   const handleOpenPopover = () => {
//     setOpenPopover(true);
//   };
//
//   const handleClosePopover = () => {
//     setOpenPopover(false);
//   };
//
//   return (
//     <>
//       <Tooltip title="Contacts">
//         <IconButton
//           onClick={handleOpenPopover}
//           sx={{ ml: 1 }}
//           ref={anchorRef}
//         >
//           <UsersIcon fontSize="small" />
//         </IconButton>
//       </Tooltip>
//       <ContactsPopover
//         anchorEl={anchorRef.current}
//         onClose={handleClosePopover}
//         open={openPopover}
//       />
//     </>
//   );
// };

const NotificationsButton = () => {
  const anchorRef = useRef(null);
  const [unread, setUnread] = useState(0);
  const [openPopover, setOpenPopover] = useState(false);
  // Unread notifications should come from a context and be shared with both this component and
  // notifications popover. To simplify the demo, we get it from the popover

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  const handleUpdateUnread = (value) => {
    setUnread(value);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          ref={anchorRef}
          sx={{ ml: 1 }}
          onClick={handleOpenPopover}
        >
          <Badge
            color="error"
            badgeContent={unread}
          >
            <BellIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>

      {/*Esto contiene las notificaciones de Prueba, y me muestra el numero de notificaciones en la campana.*/}
      {/*TENGO QUE CAMBIAR ESTO PARA QUE NO ME MUESTRE LAS NOTIFICACIONES DE PRUEBA DE MATERIAL UI.*/}
      <NotificationsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        onUpdateUnread={handleUpdateUnread}
        open={openPopover}
      />
    </>
  );
};

/* Botón del Icono con la Foto de Perfil en la Barra de Navegación Superior, el cual, cuando hace clic, te dejará
* cerrar tu sesión.
*
* Esta esl a Foto de Perfil que aparece en la barra de navegación, FUERA del menú que aparece si clicas en la foto de
* perfil. Es decir, esta es la foto que debes de lcicar para abrir el menú para cerrar la sesión.
*
* Cambié la foto de perfil por una foto de perfil genérica libre de copyright.
* */
const AccountButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    avatar: '/static/mock-images/avatars/avatar-generico.png',    // Foto de Perfil del Usuario.
    // name: 'Anika Visser'    // Nombre del Usuario. NO SE ESTA IMPRIMIENDO EN LA PAGINA.
  };

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        {/* Foto de Perfil del Usuario que está en la barra de navegación, el cual puedes clicar apra cerrar sesión */}
        <Avatar
          sx={{
            height: 40,
            width: 40
          }}
          src={user.avatar}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

export const DashboardNavbar = (props) => {
  const { onOpenSidebar, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {/*<LanguageButton />*/}
          <ContentSearchButton />
          {/*<ContactsButton />*/}
          <NotificationsButton />
          <AccountButton />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
