import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Image,
  Tag,
  HStack,
  Button,
  keyframes,
} from '@chakra-ui/react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl: string
  liveUrl?: string
  delay: number
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const ProjectCard = ({ title, description, image, tags, githubUrl, liveUrl, delay }: ProjectCardProps) => {
  const animation = `${fadeIn} 0.6s ease-out forwards ${delay}s`

  return (
    <Box
      bg="rgba(0, 0, 0, 0.5)"
      borderRadius="0"
      overflow="hidden"
      border="1px solid"
      borderColor="neon.blue"
      boxShadow="0 0 20px rgba(0, 243, 255, 0.2)"
      transition="all 0.3s"
      animation={animation}
      position="relative"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 0 30px rgba(0, 243, 255, 0.4)',
        '& > .project-image': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box overflow="hidden">
        <Image
          src={image}
          alt={title}
          w="100%"
          h="200px"
          objectFit="cover"
          className="project-image"
          transition="transform 0.3s"
          filter="grayscale(50%)"
          _hover={{ filter: "grayscale(0%)" }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          h="200px"
          bg="linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)"
          pointerEvents="none"
        />
      </Box>

      <VStack p={6} spacing={4} align="start">
        <Heading
          size="lg"
          color="neon.purple"
          textShadow="0 0 10px rgba(191, 0, 255, 0.5)"
          letterSpacing="wider"
        >
          {title}
        </Heading>
        
        <Text
          color="whiteAlpha.900"
          fontSize="md"
          lineHeight="tall"
          letterSpacing="wide"
        >
          {description}
        </Text>

        <HStack spacing={3} flexWrap="wrap">
          {tags.map((tag) => (
            <Tag
              key={tag}
              bg="transparent"
              color="neon.green"
              borderWidth="1px"
              borderColor="neon.green"
              borderRadius="0"
              textTransform="uppercase"
              fontSize="xs"
              letterSpacing="wider"
              px={3}
              py={1}
              _hover={{
                bg: 'rgba(0, 255, 159, 0.1)',
                boxShadow: '0 0 10px rgba(0, 255, 159, 0.3)',
              }}
            >
              {tag}
            </Tag>
          ))}
        </HStack>

        <HStack spacing={4} pt={2}>
          <Button
            as="a"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<FaGithub />}
            variant="solid"
            size="sm"
          >
            View Code
          </Button>
          {liveUrl && (
            <Button
              as="a"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaExternalLinkAlt />}
              variant="outline"
              size="sm"
            >
              Live Demo
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  )
}

const Portfolio = () => {
  const projects = [
    {
      title: 'Breeze Flow',
      description: 'A modern task management application built with React and TypeScript. Features include drag-and-drop task organization, real-time updates, and a clean, intuitive interface. The app helps users manage their workflow efficiently with a focus on user experience and productivity.',
      image: 'https://raw.githubusercontent.com/Punds101/Breeze-Flow/main/preview.png',
      tags: ['React', 'TypeScript', 'Chakra UI', 'React DnD', 'Firebase'],
      githubUrl: 'https://github.com/Punds101/Breeze-Flow',
      liveUrl: 'https://breeze-flow.vercel.app',
      delay: 0,
    },
    {
      title: 'Personal Website',
      description: 'A minimalist portfolio website showcasing my work and skills. Built with vanilla HTML, CSS, and JavaScript, demonstrating proficiency in core web technologies and responsive design principles.',
      image: 'https://raw.githubusercontent.com/Punds101/portfolio/main/preview.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      githubUrl: 'https://github.com/Punds101/portfolio',
      liveUrl: 'https://dominikkoenitzer.ch',
      delay: 0.2,
    },
  ]

  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={16}>
        <VStack spacing={4} textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            color="neon.blue"
            textShadow="0 0 20px rgba(0, 243, 255, 0.5)"
            letterSpacing="wider"
            textTransform="uppercase"
          >
            My Projects
          </Heading>
          <Text
            fontSize="lg"
            color="whiteAlpha.900"
            maxW="container.md"
            letterSpacing="wide"
          >
            Here are some of my recent projects, showcasing my skills in web development
            and software engineering.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="100%">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default Portfolio 