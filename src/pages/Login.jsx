import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Box, Typography, Grid, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleAuth from '../components/GoogleAuth';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast('Please wait!', {
            icon: '👏',
        });
        // toast.error('It takes a few seconds 🙏!');
        // let msg = null;
        try {
            let loginRes = await login({ email, password });
            console.log(loginRes)
            toast.success(loginRes)

        } catch (error) {
            console.error(error)
            toast.error('Login failed. Please check your credentials.');
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    // Handle Google Login success
    // const handleGoogleSuccess = (response) => {
    //     const decoded = jwt_decode(response.credential);
    //     console.log(decoded);
    //     // Send the token or user data to your backend for further processing
    //     toast.success(`Welcome ${decoded.name}!`);
    //     // Example: login({ token: response.credential });
    // };

    // // Handle Google Login failure
    // const handleGoogleFailure = (error) => {
    //     console.error('Google login failed', error);
    //     toast.error('Google login failed. Please try again.');
    // };
    return (
        <Container component="section" maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <img src="/login-img.jpeg" alt="Login" style={{ borderRadius: '16px', width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ backgroundColor: '#ffffff', p: 4, borderRadius: 2, boxShadow: 3 }}>
                        <Typography variant="h5" gutterBottom color="#002D74">Login</Typography>
                        <Typography variant="body2" color="#002D74" mb={2}>If you are already a member, easily log in</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="standard"
                                label="Email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <TextField
                                variant="standard"
                                label="Password"
                                fullWidth
                                margin="normal"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                        </form>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <hr style={{ flex: 1, borderColor: '#ccc' }} />
                            <Typography variant="body2" sx={{ mx: 2, color: '#002D74' }}>OR</Typography>
                            <hr style={{ flex: 1, borderColor: '#ccc' }} />
                        </Box>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <GoogleAuth/>
                        </Box>
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="#002D74">Don't have an account?</Typography>
                            <Link to="/register">
                                <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
                                    Register
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
