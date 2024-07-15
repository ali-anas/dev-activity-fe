import React, { useRef } from 'react';
import {
  Box,
  Card,
  Flex,
  Text,
  Stack,
  IconButton
} from '@chakra-ui/react';
import {
  ArrowForwardIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@chakra-ui/icons';
import './ContributorSummaryCard.css';

interface SummaryCardProps {
  name: string;
  value: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ name, value }) => (
  <Card variant="outline" p="4" borderWidth="2px" width={{ base: 'xss', md: 'xs' }} flex={1} height="100%">
    <Flex alignItems="center" pb="4">
      <Text color="GrayText" fontSize={15}>{name}</Text>
      <ArrowForwardIcon color="#8a8a8d" ml="2" />
    </Flex>
    <Box display="flex" alignItems="baseline" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
      <Text fontSize='2xl' fontWeight='bold'>{value}</Text>
      <Flex alignItems="baseline" ml={{ base: '0', md: '2' }} wrap="nowrap">
        <ArrowUpIcon color="#39af61" fontSize="16px" alignSelf="baseline" />
        <Text color="#39af61" fontSize="16px" fontWeight="bold">10%</Text>
        <Text fontSize="12px" ml="1" color="GrayText" alignSelf="center">vs last week</Text>
      </Flex>
    </Box>
  </Card>
);

interface ContributorSummaryCardProps {
  summaryData: { name: string; value: number }[];
}

const ContributorSummaryCard: React.FC<ContributorSummaryCardProps> = ({ summaryData }) => {
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
      <Stack direction="row" justifyContent="flex-end" spacing={4} align="center" pb="2">
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous"
          variant="outline"
          size="sm"
          isRound
          onClick={() => scroll('left')}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next"
          variant="outline"
          size="sm"
          isRound
          onClick={() => scroll('right')}
        />
      </Stack>
      <div className="horizontal-scroll-container">
        <div className="horizontal-scroll-content" ref={scrollRef}>
          <Flex gap="4" alignItems="center">
            {summaryData.map(activity => (
              <SummaryCard key={activity.name} value={activity.value} name={activity.name} />
            ))}
          </Flex>
        </div>
      </div>
    </>
  );
};

export default ContributorSummaryCard;
