import * as path from "path";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as events from "@aws-cdk/aws-events";
import * as eventsTargets from "@aws-cdk/aws-events-targets";
import * as s3 from "@aws-cdk/aws-s3";

export class ServerlessNftCheckerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nftChecks = new s3.Bucket(this, "nftChecks");

    const nftChecker = new lambda.Function(this, "nftChecker", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "functions", "nftChecker")
      ),
      environment: {
        BUCKET_NAME: nftChecks.bucketName,
        CONTRACT_ADDRESS: "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b",
      },
    });

    nftChecks.grantWrite(nftChecker);

    const rule = new events.Rule(this, "nftCheckRule", {
      schedule: events.Schedule.rate(cdk.Duration.hours(1)),
    });
    rule.addTarget(new eventsTargets.LambdaFunction(nftChecker));
  }
}
