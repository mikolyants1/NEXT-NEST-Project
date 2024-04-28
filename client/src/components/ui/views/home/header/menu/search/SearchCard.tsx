
import { Box, Flex, Input } from '@chakra-ui/react';
import SearchMapCard from './items/SearchMapCard';
import { IUser } from '@/components/libs/types/type';
import { getUsers } from '@/components/api/query/user/getUsers';

async function SearchCard():Promise<JSX.Element> {
  const users:IUser[] = await getUsers();
  return (
    <Flex w="100%"
     justifyContent="center"
     alignItems="center"
     flexDir="column"
     overflowY="scroll"
     h="100%">
      <SearchMapCard users={users} />
    </Flex>
  )
}

export default SearchCard