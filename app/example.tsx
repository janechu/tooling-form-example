import React from "react";
import { MessageSystem } from "@microsoft/fast-tooling";
import { Form } from "@microsoft/fast-tooling-react";

let fastMessageSystem: MessageSystem;

interface ExampleState {
    data: any;
}

class Example extends React.Component<{}, ExampleState> {
    constructor(props) {
        super(props);

        if ((window as any).Worker) {
            fastMessageSystem = new MessageSystem({
                webWorker: "/message-system.js",
                dataDictionary: [
                    {
                        root: {
                            schemaId: "text",
                            data: {},
                        },
                    },
                    "root",
                ],
                schemaDictionary: {
                    text: {
                        title: "Text",
                        id: "text",
                        $id: "text",
                        type: "object",
                        properties: {
                            myString: {
                                title: "My String",
                                type: "string"
                            }
                        }
                    },
                },
            });
            fastMessageSystem.add({
                onMessage: this.handleMessageSystem,
            });
        }

        this.state = {
            data: {},
        };
    }

    public render() {
        return (
            <div>
                <Form messageSystem={fastMessageSystem} />
                <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
            </div>
        );
    }

    private handleMessageSystem = (e): void => {
        if (
            e.data &&
            e.data.data !== this.state.data
        ) {
            this.setState({
                data: e.data.data,
            });
        }
    };
}

export default Example;
