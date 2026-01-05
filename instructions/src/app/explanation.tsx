import Link from 'next/link';
import styled from 'styled-components';

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  border: 2px solid #1976d2;
  background: transparent;
  color: #1976d2;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #1976d2;
    color: white;
  }
`;

export default function Explanation() {
    return (
        <Hero>
            <Title>Posts Documentation</Title>
            <Subtitle>
                Learn how to use components and APIs from the posts project.
            </Subtitle>
            <ButtonGroup>
                <Button href="/docs">
                    Browse Docs
                </Button>
                <Button href="/register">
                    Browse Register
                </Button>
            </ButtonGroup>
        </Hero>
    );
}