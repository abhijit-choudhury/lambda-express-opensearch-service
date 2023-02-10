import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { Client} from "@opensearch-project/opensearch";
import { AwsSigv4Signer } from "@opensearch-project/opensearch/aws";

const HOST = "https://vpko250aj2rlr2n4n2n3.eu-west-1.aoss.amazonaws.com";

const client = new Client({
    ...AwsSigv4Signer({
        region: 'eu-west-1',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        service: 'aoss',
        getCredentials: () => {
            const credentialsProvider = defaultProvider();
            return credentialsProvider();
        }
    }),
    node: HOST
});

export { client }