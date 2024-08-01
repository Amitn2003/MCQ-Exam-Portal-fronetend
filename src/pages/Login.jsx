import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Box, Typography, Grid, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
            
            // If login succeeds, show a success toast
            // let loginMessage = await loginRes.message;
            // msg = loginMessage
            // if (loginRes.message == "User logged in successfully") {
            //     toast.success("Log in successful")
            // }
            // else {
            //     toast.error('Please try again');
            // }
        } catch (error) {
            console.error(error)
            toast.error('Login failed. Please check your credentials.');
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    // <section className="bg-gray-50 min-h-screen flex items-center justify-center">
    //     {/* login container */}
    //     <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
    //         <div className="md:block hidden w-1/2">
    //             <img className="rounded-2xl" src="/login-img.jpeg" />
    //         </div>
    //         {/* form */}
    //         <div className="md:w-1/2 px-8 md:px-16">
    //             <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
    //             <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
    //             <form action="true" className="flex flex-col gap-4"  onSubmit={handleSubmit} >
    //                 <input className="p-2 mt-8 rounded-xl border text-black" id='email' type="email" name="email" placeholder="Email"
    //                     value={email} required
    //                     onChange={(e) => setEmail(e.target.value)} />
    //                 <div className="relative">
    //                     <input className="p-2 rounded-xl border w-full text-black" id="password" type="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" value={password} required />
    //                     <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
    //                         <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
    //                         <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    //                     </svg>
    //                 </div>
    //                 <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
    //             </form>
    //             <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
    //                 <hr className="border-gray-400" />
    //                 <p className="text-center text-sm">OR</p>
    //                 <hr className="border-gray-400" />
    //             </div>

    //             <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
    //                 <p>Don't have an account?</p>
    //                 <Link to="/register">
    //                 <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
    //                 </Link>
    //             </div>
    //         </div>
    //         {/* image */}
    //     </div>
    // </section>
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
