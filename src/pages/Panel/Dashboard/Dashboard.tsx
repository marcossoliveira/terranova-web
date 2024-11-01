import { SetStateAction, useEffect, useState } from 'react';
import './Dashboard.css';
import {
  Container,
  Typography,
  Toolbar,
  AppBar,
  Grid,
  Card,
  CardContent,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Divider,
  Button,
  CardHeader,
  CardActionArea,
  CardActions,
  Icon,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserPayload } from '../../../services/api/auth-service';
import { IndividualRank } from '../../../models/individual-rank-model';
import { getData } from '../../../services/api/api-service';
import { ThemeOptions } from '../../../constants';
import {
  Add,
  AirplaneTicket,
  CardGiftcard,
  DarkMode,
  DocumentScannerTwoTone,
  ExitToApp,
  LightMode,
  People,
  Support,
  Warning,
  WhatsApp,
  WorkspacePremium,
} from '@mui/icons-material';
import { PunishmentModel } from '../../../models/punishment-model';
import { getPunishmentDetails, getRankDetails } from './utils';
import {
  getTicketStatus,
  getTicketType,
  TicketModel,
} from '../../../models/ticket-model';
import { CreateTicket } from './Tickets/CreateTicket';
import { ViewTicket } from './Tickets/ViewTicket';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Dashboard() {
  const router = useNavigate();

  const userData: UserPayload = JSON.parse(
    localStorage.getItem('user') || '{}',
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        toast.error('Você precisa estar logado para acessar essa página');
        router('/painel/login');
    }
}, [router]);

  const [rankings, setRankings] = useState<IndividualRank[]>([]);
  const [punishment, setPunishment] = useState<PunishmentModel[]>([]);
  const [tickets, setTickets] = useState<TicketModel[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketModel | null>(
    null,
  );
  const [theme, setTheme] = useState<ThemeOptions>(
    (localStorage.getItem('theme') as ThemeOptions) ?? 'light',
  );

  // dialogs

  const [openCreateTicket, setOpenCreateTicket] = useState(false);
  const [openViewTicket, setOpenViewTicket] = useState(false);

  useEffect(() => {
    async function fetchRankings() {
      try {
        const response = await getData(`/stats/ranking/player/${userData.ai}`);
        const data = response;

        setRankings(data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    }

    async function fetchPunishments() {
      try {
        const response = await getData(`/warning/punishment/findAll`, {
          name: userData.last_name,
          page: 0,
          limit: 1000,
        });
        const data = response;

        setPunishment(data.items);

        // Handle punishments data here
      } catch (error) {
        console.error('Error fetching punishments:', error);
      }
    }

    async function fetchTickets() {
      try {
        const response = await getData(`/ticket/findAll`, {
          player: userData.last_name,
          page: 0,
          limit: 1000,
        });
        const data = response;

        setTickets(data.items);

        // Handle tickets data here
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }

    fetchPunishments();

    fetchRankings();

    fetchTickets();
  }, [openCreateTicket]);

  const changeTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  const customTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const logoff = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router('/painel/login');
  };

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <CreateTicket
          open={openCreateTicket}
          setOpen={() => setOpenCreateTicket(false)}
          playerData={userData}
        />
        <ViewTicket
          open={openViewTicket}
          setOpen={() => setOpenViewTicket(false)}
          playerData={userData}
          ticketData={selectedTicket!}
        />
        <AppBar position="fixed" color="default">
          <Toolbar className="styled-toolbar">
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="dashboard-title"
            >
              Terra Nova - Painel
            </Typography>
            <div>
              <IconButton onClick={changeTheme} color="inherit">
                {theme === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
              <Tooltip title="Sair">
                <IconButton color="inherit" onClick={() => logoff()}>
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
        <Container className="container-wrap">
          <div className="welcome-wrap">
            <img
              src={`https://cravatar.eu/helmhead/${userData.last_name}/64.png`}
              alt=""
            />
            <div>
              <span className="welcome-message">Bem vind@ de volta,</span>{' '}
              <br />
              <strong className="welcome-display-name">
                {userData.last_name}
              </strong>
            </div>
          </div>
          <div className="ranking-wrap">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography
                  variant="h5"
                  color="primary"
                  fontWeight="bold"
                  textAlign="center"
                  className="ranking-title"
                >
                  <WorkspacePremium className="icon-title" />
                  Seus rankings
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  {rankings.map((rank) => {
                    const { formattedValue, name, position } =
                      getRankDetails(rank);
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={rank.name}>
                        <div className="rank-item">
                          <Avatar
                            className={
                              rank.rank <= 3 ? `top_${position}` : 'no_top'
                            }
                          >
                            {position}º
                          </Avatar>

                          <Typography variant="body2" textAlign="center">
                            {name}
                          </Typography>
                          <Typography variant="h6" textAlign="center">
                            {formattedValue}
                          </Typography>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography
                  variant="h5"
                  color="primary"
                  fontWeight="bold"
                  textAlign="center"
                  className="ranking-title"
                >
                  <Warning className="icon-title" />
                  Suas punições
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {punishment.length ? (
                  <Grid container spacing={1}>
                    {punishment.map((item) => {
                      const { end, operator, punishmentType, reason, start } =
                        getPunishmentDetails(item);
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
                          <Card className="punishment-item">
                            <CardContent>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                textAlign="center"
                              >
                                {punishmentType}
                              </Typography>
                              <Divider style={{ margin: '1rem 0 1rem 0' }} />
                              <Typography
                                variant="subtitle2"
                                textAlign="center"
                              >
                                <strong>Razão:</strong> {reason}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                textAlign="center"
                              >
                                <strong>Autor:</strong> {operator}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                textAlign="center"
                              >
                                <strong>Início:</strong>{' '}
                                {start.toLocaleString()}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                textAlign="center"
                              >
                                <strong>Fim:</strong>{' '}
                                {item.punishmentType === 'BAN' ||
                                item.punishmentType === 'IP_BAN'
                                  ? '∞ Eterno'
                                  : end.toLocaleString()}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                ) : (
                  <Typography variant="body1" textAlign="center">
                    Nenhuma punição encontrada
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography
                  variant="h5"
                  color="primary"
                  fontWeight="bold"
                  textAlign="center"
                  className="ranking-title"
                >
                  <DocumentScannerTwoTone className="icon-title" />
                  Tickets
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="button-wrap">
                  <Button
                    color="primary"
                    onClick={() => setOpenCreateTicket(true)}
                  >
                    <Add /> Novo Ticket
                  </Button>
                </div>

                {tickets.length ? (
                  <Grid container spacing={1}>
                    {tickets.map((item) => {
                      return (
                        <Grid item xs={12}  key={item.id}>
                          <Card className="ticket-item">
                            <CardHeader
                              avatar={
                                <Avatar>
                                  {
                                    {
                                      support: <Support />,
                                      denounce: <Warning />,
                                      donation_receipt: <CardGiftcard />,
                                      whatsapp: <WhatsApp />,
                                    }[item.ticketType]
                                  }
                                </Avatar>
                              }
                              title={`#${item.id} ${getTicketType(item.ticketType)}`}
                              subheader={`Status: ${getTicketStatus(item.status)}`}
                            />
                            <CardContent>
                              <Typography
                                variant="h6"
                                color="textSecondary"
                                component="p"
                                fontWeight={800}
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                variant="body1"
                                color="textSecondary"
                                component="p"
                              >
                                {item.description}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                marginTop={2}
                              >
                                <strong>Data de Criação:</strong>{' '}
                                {new Date(item.createdAt).toLocaleString()}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <strong>Última Atualização: </strong>{' '}
                                {new Date(item.updatedAt).toLocaleString()}
                              </Typography>
                              {item.attachments
                                ? JSON.parse(item.attachments).map(
                                    (item: string) => (
                                      <img
                                        src={item}
                                        className="img-card"
                                        key={item}
                                        alt="img"
                                      ></img>
                                    ),
                                  )
                                : null}
                            </CardContent>
                            <CardActions>
                              <Button
                                size="small"
                                color="primary"
                                onClick={() => {

                                  setSelectedTicket(item);
                                  setOpenViewTicket(true);
                                }}
                              >
                                Ver ticket
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                ) : (
                  <Typography variant="body1" textAlign="center">
                    Nenhuma punição encontrada
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}
