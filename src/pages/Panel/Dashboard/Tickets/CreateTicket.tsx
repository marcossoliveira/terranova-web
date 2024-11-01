import { forwardRef, useState } from 'react';
import { TicketModel } from '../../../../models/ticket-model';
import { TransitionProps } from '@mui/material/transitions';
import {
  AppBar,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
  MenuItem,
  Slide,
  TextareaAutosize,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useWindowSize } from '@uidotdev/usehooks';
import { uploadImage } from '../../../../services/firebase/storage-service';
import { UserPayload } from '../../../../services/api/auth-service';
import { postData } from '../../../../services/api/api-service';
import { Bounce, toast } from 'react-toastify';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CreateTicketProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  playerData: UserPayload;
}

export function CreateTicket({ open, setOpen, playerData }: CreateTicketProps) {
  const size = useWindowSize();

  const [loading, setLoading] = useState(false);
  const [attFile, setAttFile] = useState<File | null>(null);

  const [ticket, setTicket] = useState<Partial<TicketModel>>({
    ticketType: 'support',
    player: playerData.last_name,
    title: '',
    description: '',
    attachments: null,
    status: 'pending',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
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

      await postData('/ticket/create', { ...ticket, attachments });
      setOpen(false);
      toast('🎉 Ticket criado com sucesso!', {
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

      setTicket({
        ticketType: 'support',
        player: playerData.last_name,
        title: '',
        description: '',
        attachments: null,
        status: 'pending',
      });
      setAttFile(null);
      setLoading(false);
    } catch (error) {
      toast('🚨 Erro ao criar ticket!', {
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
              Criar novo ticket
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleSave}
              disabled={loading || !ticket.title}
            >
              {loading ? (
                <CircularProgress></CircularProgress>
              ) : (
                <span>Salvar</span>
              )}
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Tipo"
                name="ticketType"
                select
                value={ticket.ticketType}
                onChange={handleChange}
                disabled={loading}
              >
                <MenuItem value="support">
                  <ListItemText primary="Suporte" />
                </MenuItem>
                <MenuItem value="denounce">
                  <ListItemText primary="Denúncia" />
                </MenuItem>
                <MenuItem value="donation_receipt">
                  <ListItemText primary="Comprovante de doação" />
                </MenuItem>
                <MenuItem value="whatsapp">
                  <ListItemText primary="WhatsApp" />
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                value={ticket.title}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline={true}
                rows={4}
                placeholder="Descrição"
                name="description"
                value={ticket.description}
                onChange={handleChange}
                fullWidth
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Anexo</Typography>
            </Grid>

            {attFile && (
              <Grid item xs={12}>
                <img
                  src={URL.createObjectURL(attFile)}
                  alt="Anexo"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              {!attFile ? (
                <Button variant="outlined" component="label" disabled={loading}>
                  Selecionar anexo (Apenas imagens)
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAttFile(file);
                      }
                    }}
                  />
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setAttFile(null)}
                  disabled={loading}
                >
                  Remover anexo
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
