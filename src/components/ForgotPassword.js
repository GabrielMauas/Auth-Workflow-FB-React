import React, { useRef, useState } from 'react';
import { Heading, Stack, Input, Button, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPass } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPass(emailRef.current.value);
            setMessage('Check your inbox for instructions');
        } catch (error) {
            setError('Failed to reset password.');
        }
        setLoading(false);
    }

    return (
        <>
            <Heading textAlign="center" p="5">Reset Password</Heading>
            <Stack as="form" spacing={3} m="5" mx="auto" w={["85%", "80%", "40%"]} onSubmit={handleSubmit}>
                <Input type="email" variant="outline" placeholder="Email" ref={emailRef} />
                
                <Button disabled={loading} type="submit" colorScheme="purple" >Submit</Button>
                <Text textAlign="right"><Button variant="link"><Link to="/login">Back to Log in</Link></Button></Text>
            
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                {message && (
                    <Alert status="success">
                        <AlertIcon />
                        {message}
                    </Alert>
                )}

            </Stack>

 
        </>
    )
}

export default ForgotPassword
