import { forwardRef, useEffect, useState } from 'react';
import {
  getTicketStatus,
  getTicketType,
  TicketCommentModel,
  TicketModel,
} from '../../../../models/ticket-model';
import { TransitionProps } from '@mui/material/transitions';
import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useWindowSize } from '@uidotdev/usehooks';
import { uploadImage } from '../../../../services/firebase/storage-service';
import { UserPayload } from '../../../../services/api/auth-service';
import { getData, postData } from '../../../../services/api/api-service';
import { Bounce, toast } from 'react-toastify';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ViewTicketProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  playerData: UserPayload;
  ticketData?: TicketModel;
}

export function ViewTicket({
  open,
  setOpen,
  playerData,
  ticketData,
}: ViewTicketProps) {
  const size = useWindowSize();

  const [loading, setLoading] = useState(false);
  const [attFile, setAttFile] = useState<File | null>(null);

  const [comments, setComments] = useState<TicketCommentModel[]>([]);

  const [ticketComment, setTicketComment] = useState<
    Partial<TicketCommentModel>
  >({
    player: playerData.last_name,
    description: '',
    attachments: null,
  });

  useEffect(() => {
    const fetchComments = async () => {
      if (ticketData?.id) {
        try {
          const response = await getData(`/ticket/comment/findAll`, {
            ticket: ticketData.id,
            page: 0,
            limit: 100,
          });

          setComments(response.items);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      }
    };

    fetchComments();
  }, [ticketData, loading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTicketComment((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let attachments: string[] | null = null;
      if (attFile) {
        const resultImg = await uploadImage(attFile!, [
          'tickets',
          playerData.last_name,
        ]);
        attachments = [resultImg];
      }

      await postData('/ticket/comment/create', {
        ...ticketComment,
        attachments,
        ticket: ticketData?.id,
      });
      toast('🎉 Comentário publicado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem('theme') || 'light',
        transition: Bounce,
      });

      setTicketComment({
        player: playerData.last_name,
        description: '',
        attachments: null,
      });
      setAttFile(null);
      setLoading(false);
    } catch (error) {
      toast('🚨 Erro ao criar comentário!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem('theme') || 'light',
        transition: Bounce,
      });
      console.error('Error creating ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {ticketData ? (
        <Dialog
          fullScreen={(size.width || 600) < 600}
          open={open}
          onClose={setOpen}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setOpen(false)}
                aria-label="close"
                disabled={loading}
              >
                <Close />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Ticket #{ticketData?.id} - Aberto por {ticketData?.player}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemText
                  primary="Tipo"
                  secondary={getTicketType(ticketData.ticketType)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Status"
                  secondary={getTicketStatus(ticketData.status)}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Título" secondary={ticketData.title} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Descrição"
                  secondary={ticketData.description}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Aberto em"
                  secondary={new Date(ticketData.createdAt).toLocaleString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Anexos"
                  secondary={ticketData.attachments ? '' : 'Sem anexos'}
                />
              </ListItem>
              {ticketData.attachments ? (
                JSON.parse(ticketData.attachments).map(
                  (item: string, index: number) => (
                    <img
                      src={item}
                      key={item + index.toString()}
                      alt="Attachment"
                      style={{
                        width: '100%',
                        maxHeight: '300px',
                        objectFit: 'contain',
                        padding: '0px 10px 10px 10px',
                      }}
                    />
                  ),
                )
              ) : (
                <span></span>
              )}
            </List>
            <Divider style={{ margin: '20px 0' }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Comentários ({comments.length})
                </Typography>
                {comments.length > 0 ? (
                  comments.map((comment, index: number) => (
                    <ListItem
                      key={comment.createdAt + index}
                      alignItems="flex-start"
                      divider={true}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {comment.player ? (
                            <img
                              src={`https://cravatar.eu/helmavatar/${playerData.last_name}/32.png`}
                              alt="Avatar"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          ) : (
                            <img
                              src={comment.avatar || ''}
                              alt="Avatar"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              component="span"
                              variant="body1"
                              fontWeight={800}
                              color="textPrimary"
                            >
                              {comment.username
                                ? `${comment.username} (${comment.userType})`
                                : comment.player}
                            </Typography>
                            {' - '}
                            <Typography
                              component="span"
                              variant="body2"
                              color="textSecondary"
                            >
                              {new Date(comment.createdAt).toLocaleString()}
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {comment.description}
                            </Typography>
                            {comment.attachments && (
                              <img
                                src={JSON.parse(comment.attachments)[0]}
                                alt="Attachment"
                                style={{
                                  width: '100%',
                                  maxHeight: '300px',
                                  objectFit: 'contain',
                                  padding: '10px 0',
                                }}
                              />
                            )}
                          </>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Nenhum comentário encontrado.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {attFile && (
                  <Grid item xs={12}>
                    <img
                      src={URL.createObjectURL(attFile)}
                      alt="Anexo"
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                  </Grid>
                )}
                <Button
                  variant="outlined"
                  component="label"
                  disabled={loading}
                  style={{ margin: '10px 0' }}
                >
                  Anexar Arquivo
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    hidden
                    onChange={(e) => setAttFile(e.target.files?.[0] || null)}
                  />
                </Button>
                <TextField
                  label="Adicionar comentário"
                  name="description"
                  value={ticketComment.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  disabled={loading}
                />
                <Button
                  autoFocus
                  color="inherit"
                  onClick={handleSave}
                  disabled={loading || !ticketComment.description}
                >
                  {loading ? (
                    <CircularProgress></CircularProgress>
                  ) : (
                    <span>Adicionar comentário</span>
                  )}
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      ) : (
        <span>Ticket não selecionado</span>
      )}
    </>
  );
}
