# Deployment

Netlify: https://app.netlify.com/sites/fari/overview
Azure Devops: https://dev.azure.com/rpdeshaies/fari/_build?definitionId=1&_a=summary

## Fari

Fari is deployed to a preview Netlify site using Azure Devops with

```sh
yarn run deploy:preview --auth $(NETLIFY_AUTH_TOKEN) --message "$(Build.SourceBranch)"
```

and to a production Netlify with:

```sh
yarn run deploy:prod --auth $(NETLIFY_AUTH_TOKEN) --message "$(Build.SourceBranch)"
```

The NETLIFY_AUTH_TOKEN was created via the netlify UI

## Fari Peer Server

/.netlify/functions/fari-peer-server/peerjs

yarn netlify functions:build --src functions