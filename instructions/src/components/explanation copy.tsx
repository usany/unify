import Link from 'next/link';
import { Hero, Title, Subtitle, ButtonGroup, Button } from './explanation.styled';

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