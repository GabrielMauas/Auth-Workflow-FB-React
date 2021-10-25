import { Heading, Text, Button, Box, Alert, AlertIcon, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

const Dashboard = () => {

    const [error, setError] = useState('');
    const { currentUser, logOut } = useAuth();
    const history = useHistory();

    const handleLogOut = async () => {
        setError('');

        try {
            await logOut();
            history.push('/login');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <Heading textAlign="center" p="5">Profile</Heading>
            <Stack textAlign="center" spacing={3} m="5" mx="auto" border="1px" p="5" borderRadius="10" borderColor="gray.300" w={["85%", "80%", "40%"]}>
                <Text fontSize="lg"><strong>Email: </strong>{currentUser.email}</Text>
                <Link to="/update-profile">
                    <Button w="80%" textAlign="center" _focus={{"border": "none"}} variant="ghost" fontSize="md" colorScheme="blue">Update Profile</Button>
                </Link>
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
            </Stack>
            <Box align="center">
                <Button onClick={handleLogOut} fontSize="18" variant="ghost" colorScheme="red" >Log Out</Button>
            </Box>
            {/* <Button variant="link" onClick={handleLogOut} fontSize="18" colorScheme="red" >Log Out</Button> */}

        </>
    )
}

export default Dashboard
