import React, { useRef, useState } from 'react';
import { Heading, Stack, Input, Button, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const confPassRef = useRef();
    const history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(confPassRef.current.value !== passRef.current.value){
            return setError('Passwords do not match.');
        }
        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passRef.current.value);
            history.push('/');
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);

    }


    return (
        <>
            <Heading textAlign="center" p="5">Sign Up</Heading>
            <Stack as="form" spacing={3} m="5" mx="auto" w={["85%", "80%", "40%"]} onSubmit={handleSubmit}>
                <Input type="email" variant="outline" placeholder="Email" ref={emailRef} />
                <Input type="password" variant="outline" placeholder="Password" ref={passRef} />
                <Input type="password" variant="outline" placeholder="Confirm Password" ref={confPassRef} />
                <Button disabled={loading} type="submit" colorScheme="purple">Sign Up</Button>
                <Text textAlign="right">Already have an account? <Link to="/login">Log In!</Link></Text>
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

export default SignUp
