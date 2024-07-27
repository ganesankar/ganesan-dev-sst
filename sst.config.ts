import { SSTConfig } from "sst";
import {
  Cognito,
  NextjsSite,
  Table,
  Function,
  Api,
  Bucket,
  toCdkDuration,
} from "sst/constructs";
import * as cdk from "aws-cdk-lib";
import { OAuthScope } from "aws-cdk-lib/aws-cognito";
export default {
  config(_input) {
    return {
      name: "ganesan-dev-sst",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // DNS and URLs (Route53, CloudFront, ACM, etc.)
      //              Production ::               Non-production ::
      // Frontend:    ganesan.dev         {stage}.ganesan.dev
      const hostedZoneDomain = "ganesan.dev";
      const rootDomain =
        stack.stage === "prod"
          ? `${hostedZoneDomain}`
          : `${stack.stage}.${hostedZoneDomain}`;
      const nextAuthUrl =
        stack.stage === "dev"
          ? "http://localhost:3000"
          : `https://${rootDomain}`;

      // Removal policy
      const removalPolicy =
        stack.stage === "prod"
          ? cdk.RemovalPolicy.RETAIN
          : cdk.RemovalPolicy.DESTROY;

      // Admin User Pool (Cognito)
      const adminUserPool = new Cognito(stack, "WebSiteAdminUserPool", {
        login: ["email"],
        cdk: {
          userPool: {
            removalPolicy: removalPolicy,
            selfSignUpEnabled: false,
          },
          userPoolClient: {
            idTokenValidity: toCdkDuration(`1 days`),
            accessTokenValidity: toCdkDuration(`1 days`),
            refreshTokenValidity: toCdkDuration(`10 days`),
            generateSecret: true,
            oAuth: {
              flows: {
                authorizationCodeGrant: true,
              },
              scopes: [OAuthScope.PROFILE],
              callbackUrls: [`${nextAuthUrl}/api/auth/callback/cognito`,`https://d1xlptjvxgwwy2.cloudfront.net/api/auth/callback/cognito`],
            },
          },
        },
      });

      // Cognito Domain
      adminUserPool.cdk.userPool.addDomain("WebSiteCognitoDomain", {
        cognitoDomain: {
          domainPrefix: `${stack.stage}-ganesan-dev`,
        },
      });
      /// S3 Bucket for attachments
      const uploadsBucket = new Bucket(stack, "uploadsBucket", {
        cors: true,
        cdk: {
          bucket: {
            publicReadAccess: true,
          },
        },
      });

      /// DYNAMODB TABLES
      /// DYNAMODB TABLES -- BLOG POSTS
      const PostTable = new Table(stack, "PostTable", {
        fields: {
          slug: "string",
          isPublished: "number",
          publishedOn: "string",
        },
        primaryIndex: { partitionKey: "slug" },
        globalIndexes: {
          isPublishedIndex: {
            partitionKey: "isPublished",
            sortKey: "publishedOn",
          },
        },
      });
      /// DYNAMODB TABLES -- RESUME ITEMS
      const ResumeTable = new Table(stack, "ResumeTable", {
        fields: {
          id: "string",
          isPublished: "number",
          publishedOn: "string",
        },
        primaryIndex: { partitionKey: "id" },
        globalIndexes: {
          isPublishedIndex: {
            partitionKey: "isPublished",
            sortKey: "publishedOn",
          },
        },
      });

      /// DYNAMODB TABLES -- PROJECTS ITEMS
      const ProjectsTable = new Table(stack, "ProjectsTable", {
        fields: {
          slug: "string",
          isPublished: "number",
        },
        primaryIndex: { partitionKey: "slug" },
        globalIndexes: {
          isPublishedIndex: {
            partitionKey: "isPublished",
          },
        },
      });
      const envVariables = {
        DB_POST_TABLE: PostTable.tableName,
        DB_RESUME_TABLE: ProjectsTable.tableName,
        DB_PROJECTS_TABLE: ResumeTable.tableName,
        COGNITO_CLIENT_ID: adminUserPool.cdk.userPoolClient.userPoolClientId,
        COGNITO_USER_POOL_ID: adminUserPool.cdk.userPool.userPoolId,
        COGNITO_CLIENT_SECRET:
          adminUserPool.cdk.userPoolClient.userPoolClientSecret.toString(),
        COGNITO_ISSUER: `https://cognito-idp.${stack.region}.amazonaws.com/${adminUserPool.cdk.userPool.userPoolId}`,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
        NEXT_PUBLIC_UPLOAD_ATTACHMENTS_URL: `https://${uploadsBucket.bucketName}.s3.${stack.region}.amazonaws.com/`,
      };

      /// LAMBDA AND API GATEWAY
      const api = new Api(stack, "WebAPI", {
        authorizers: {
          basic: {
            type: "lambda",
            responseTypes: ["simple"],
            function: new Function(stack, "authorizer", {
              handler: "api/authorizer.handler",
              environment: envVariables,
            }),
          },
        },
        defaults: {
          authorizer: "basic",
          function: {
            timeout: 20,
            environment: envVariables,
            permissions: [PostTable, ResumeTable, ProjectsTable],
          },
        },
        routes: {
          "GET /posts/all": {
            function: {
              bind: [PostTable],
              handler: "api/posts/all/get.handler",
              retryAttempts: 0,
            },
          },
          "GET /posts/{id}": {
            function: {
              bind: [PostTable],
              handler: "api/posts/{id}/get.handler",
              retryAttempts: 0,
            },
          },
          "POST /posts/{id}": {
            function: {
              bind: [PostTable],
              handler: "api/posts/{id}/post.handler",
              retryAttempts: 0,
            },
          },
          "DELETE /posts/{id}": {
            function: {
              bind: [PostTable],
              handler: "api/posts/{id}/delete.handler",
              retryAttempts: 0,
            },
          },
          "GET /projects/all": {
            function: {
              bind: [ProjectsTable],
              handler: "api/projects/all/get.handler",
              retryAttempts: 0,
            },
          },
          "GET /projects/{id}": {
            function: {
              bind: [ProjectsTable],
              handler: "api/projects/{id}/get.handler",
              retryAttempts: 0,
            },
          },
          "POST /projects/{id}": {
            function: {
              bind: [ProjectsTable],
              handler: "api/projects/{id}/post.handler",
              retryAttempts: 0,
            },
          },
          "DELETE /projects/{id}": {
            function: {
              bind: [ProjectsTable],
              handler: "api/projects/{id}/delete.handler",
              retryAttempts: 0,
            },
          },
          "GET /resume/all": {
            function: {
              bind: [ResumeTable],
              handler: "api/resume/all/get.handler",
              retryAttempts: 0,
            },
          },
          "GET /resume/{id}": {
            function: {
              bind: [ResumeTable],
              handler: "api/resume/{id}/get.handler",
              retryAttempts: 0,
            },
          },
          "POST /resume/{id}": {
            function: {
              bind: [ResumeTable],
              handler: "api/resume/{id}/post.handler",
              retryAttempts: 0,
            },
          },
          "DELETE /resume/{id}": {
            function: {
              bind: [ResumeTable],
              handler: "api/resume/{id}/delete.handler",
              retryAttempts: 0,
            },
          },
          "GET /uploads": {
            function: {
              bind: [uploadsBucket],
              handler: "api/uploads/get.handler",
              retryAttempts: 0,
            },
          },
          "POST /uploads": {
            function: {
              bind: [uploadsBucket],
              handler: "api/uploads/post.handler",
              retryAttempts: 0,
            },
          },
          "DELETE /uploads": {
            function: {
              bind: [uploadsBucket],
              handler: "api/uploads/delete.handler",
              retryAttempts: 0,
            },
          },
        },
      });
      api.bind([uploadsBucket]);
      // api.bind([PostTable, TagTable, ResumeTable]);

      /// LAMBDA AND API GATEWAY
      const ApiURL = { NEXT_PUBLIC_API_URL: api.url };
      const site = new NextjsSite(stack, "NextWeb", {
        bind: [api, PostTable, ResumeTable, ProjectsTable, uploadsBucket],
        environment: { ...envVariables, ...ApiURL },
        /* customDomain: {
          domainName: "ganesan.dev",
          domainAlias: "www.ganesan.dev",
        }, */
        edge: true,
      });

      stack.addOutputs({
        bucket: uploadsBucket.bucketName,
        API_Url: api.url,
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
