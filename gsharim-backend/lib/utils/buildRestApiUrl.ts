export default function buildRestApiUrl(
    restApiId: string,
    region: string
): string {
    return `https://${restApiId}.execute-api.${region}.amazonaws.com/prod`;
}
