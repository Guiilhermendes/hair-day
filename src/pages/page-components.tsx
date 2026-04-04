import Button from "../components/button";
import Container from "../components/container";
import Text from "../components/text";
import TextInput from "../components/text-input";

export default function PageComponents() {
    return (
        <Container>
            <div className="grid gap-10">
                <div className="flex flex-col gap-2">
                    <Text variant="title-lg">AGENDAR</Text>
                    <Text variant="title-md">AGENDAR</Text>
                    <Text variant="title-sm">AGENDAR</Text>
                    <Text>AGENDAR</Text>
                    <Text variant="text-sm">AGENDAR</Text>
                </div>

                <div className="flex flex-col gap-2">
                    <Button>AGENDAR</Button>
                    <Button disabled>AGENDAR</Button>
                </div>

                <div>
                    <TextInput />
                </div>
            </div>
        </Container>
    )
}