import React, { useRef } from 'react';
import { Avatar, Box, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Table, TableContainer, Text, Thead, Tr, Th, Tbody, Td, Tfoot, Button, Stack, IconButton } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowUpIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import './ContributorSummaryCard.css';

const SummaryCard = ({ name, value }) => (
  <Card variant="outline" p="4" borderWidth="2px" width={{ base: 'xss', md: 'xs'}} flex={1} height="100%">
    <Flex alignItems="center" pb="4">
      <Text color="GrayText" fontSize={15}>{name}</Text>
      <ArrowForwardIcon color="#8a8a8d" ml="2"/>
    </Flex>
    <Box display="flex" alignItems="baseline" flexWrap={{ base: 'wrap', md: 'nowrap'}}>
      <Text fontSize='2xl' fontWeight='bold'>{value}</Text>
      {/* Comparison number */}
      <Flex alignItems="baseline" ml={{ base: '0', md: '2'}} wrap="nowrap">
        <ArrowUpIcon color="#39af61" fontSize="16px" alignSelf="baseline" />
        <Text color="#39af61" fontSize="16px" fontWeight="bold">10%</Text>
        {/* Comparision text */}
        <Text fontSize="12px" ml="1" color="GrayText" alignSelf="center">vs last week</Text>
      </Flex>
    </Box>
  </Card>
)

const ContributorSummarCard = ({ summaryData, name }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* <Box display="flex" justifyContent="flex-end" gap="6" pb="2"> */}
      <Stack direction="row" justifyContent="flex-end" spacing={4} align="center" pb="2">
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous"
          variant="outline"
          size="sm"
          isRound
          // colorScheme="gray"
          onClick={() => scroll('left')}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next"
          variant="outline"
          size="sm"
          isRound
          // colorScheme="gray"
          onClick={() => scroll('right')}
        />
      </Stack>
        {/* <Button variant="outline" onClick={() => scroll('left')}><ChevronLeftIcon h={6} w={6} /></Button>
        <Button variant="outline" onClick={() => scroll('right')}><ChevronRightIcon h={6} w={6} /></Button> */}
      {/* </Box> */}
      <div className="horizontal-scroll-container">
        
        <div className="horizontal-scroll-content" ref={scrollRef}>
        <Flex gap="4" alignItems="center">
          {summaryData.map(activity =>  {
            const { name, value } = activity;
            return <SummaryCard key={name} value={value} name={name} />
          })}
        </Flex>
        </div>
        
      </div>
    </>
  )
}

export default ContributorSummarCard