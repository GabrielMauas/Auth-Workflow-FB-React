import React, { useRef, useState } from 'react';
import { Heading, Stack, Input, Button, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LogIn = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const { logIn } = useAuth();
    const history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            await logIn(emailRef.current.value, passRef.current.value);
            history.push('/');
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <>
            <Heading textAlign="center" p="5">Log In</Heading>
            <Stack as="form" spacing={3} m="5" mx="auto" w={["85%", "80%", "40%"]} onSubmit={handleSubmit}>
                <Input type="email" required variant="outline" placeholder="Email" ref={emailRef} />
                <Input type="password" required variant="outline" placeholder="Password" ref={passRef} />
                <Button justifyContent="flex-end" variant="link"><Link to="/reset-password">Forgot Password?</Link></Button>
                
                <Button disabled={loading} type="submit" colorScheme="purple" >Log In</Button>
                <Text textAlign="right">Don't have an account? <Button variant="link"><Link to="/signup">Sign Up!</Link></Button></Text>
            
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
            </Stack>
 

        </>
    )
}

export default LogIn
