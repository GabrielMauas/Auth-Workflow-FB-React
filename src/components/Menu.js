import { Flex, Button, Box } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';

const Menu = ({ user }) => {

    const logOut = () => {
        signOut();
    }

    return (
        <Flex color="black" p="5" justify="flex-end">
            { user 
                ? 
                <Button colorScheme="red" onClick={logOut} >Log Out</Button>
                : 
                <Box p="2">
                    <Button colorScheme="teal" mr="3">
                        Log In
                    </Button>
                    <Button colorScheme="teal" mr="3">
                        Sign In
                    </Button>
                </Box>
            }
        </Flex>
    )
}

export default Menu
