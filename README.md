# Serverless NFT Supply Checker

This is an example project. It explains how to integrate serverless AWS
infrastructure with the Ethereum blockchain.

A Lambda function will check the NFT supply of [an ERC-721 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)
periodically and write it as a new file with timestamp to an S3 bucket.

## Prerequisites

- AWS Account
- Node.js
- CDK CLI

## Setup

Install the CDK libraries:

    npm install

Build and deploy the stack:

    npm start