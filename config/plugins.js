module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                baseUrl: env('CDN_URL'),
                rootPath: env('CDN_MEDIA_ROOT_PATH'),
                s3Options: {
                    credentials: {
                        accessKeyId: env('AWS_ACCESS_KEY_ID'),
                        secretAccessKey: env('AWS_ACCESS_SECRET'),
                    },
                    region: env('AWS_REGION'),
                    params: {
                        ACL: env('AWS_ACL', 'public-read'),
                        signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
                        Bucket: env('AWS_BUCKET'),
                    },
                },
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
        },
    },
    email: {
        config: {
            provider: 'nodemailer',
            secure: true,
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.example.com'),
                port: env('SMTP_PORT', 587),
                auth: {
                    user: env('SMTP_USER'),
                    pass: env('SMTP_PASS'),
                },
                // ... any custom nodemailer options
            },
            settings: {
                defaultFrom: env('SMTP_FROM', env('SMTP_USERNAME')),
                defaultReplyTo: env('SMTP_REPLYTO', env('SMTP_USERNAME')),
            }
        },
    },
});
