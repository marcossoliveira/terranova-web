import React, { useEffect } from 'react';
import {
  Container,
  CssBaseline,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';

import logo from '../../../assets/logo.png';
import { login } from '../../../services/api/auth-service';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import { toast } from 'react-toastify';

const theme = createTheme({
  palette: {
    mode: (localStorage.getItem('theme') as 'light' | 'dark' | null) || 'light',
  },
});

function Login() {
  const router = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router('/painel/dashboard');
    }
  }, [router]);

  let loading = false;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('user') === '' || data.get('password') === '') {
      toast.error('Preencha todos os campos');
      return;
    }

    loading = true;
    try {
      const result = await login(
        data.get('user') as string,
        data.get('password') as string,
      );

      localStorage.setItem('user', JSON.stringify(result.payload));
      localStorage.setItem('token', result.access_token);
      router('/painel/dashboard');

      // Handle successful login here, e.g., redirect to another page or show a success message
    } catch (error) {
      // Handle login error here, e.g., show an error message
      toast.error('Erro ao fazer login. Por favor, tente novamente.');
    } finally {
      loading = false;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="Logo" className="login-logo" />
          <Typography component="h1" variant="h5">
            Entre no Terra Nova
          </Typography>
          <span>ou</span>
          <Button
            onClick={() => router('/')}
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
          >
            <Home /> Ir para a página inicial
          </Button>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuário"
              name="user"
              autoComplete="user"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>

            <Typography>
              O Cadastro é reliazado automáticamente ao logar pela primeira vez,
              ao criar a senha no servidor. Guarde a senha, pois é com ela que
              você irá logar no nosso sistema.
            </Typography>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
